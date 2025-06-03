import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getDbRef } from "@/lib/dbRef";
import { get, update } from "firebase/database";
import { type } from "os";

const webhook = new Webhook(process.env.DODO_WEBHOOK_KEY!);

export async function POST(request: Request) {
  const headersList = headers();
  const rawBody = await request.text();

  const data = await headersList;
  const webhookHeaders = {
    "webhook-id": data.get("webhook-id") || "",
    "webhook-signature": data.get("webhook-signature") || "",
    "webhook-timestamp": data.get("webhook-timestamp") || "",
  };

  await webhook.verify(rawBody, webhookHeaders);
  const payload = JSON.parse(rawBody);

  if (payload.type === "payment.succeeded") {
    const uid = payload.data.metadata.uid;
    const totalAmount = payload.data.total_amount;

    const dbRef = getDbRef(uid);
    const snapshot = await get(dbRef);
    const {
      tier,
    }: {
      tier: {
        count: number;
        date: string;
        type: "free" | "Standard" | "Premium";
      };
    } = snapshot.val();

    await update(dbRef, {
      tier: { ...tier, type: totalAmount < 1400 ? "Standard" : "Premium" },
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
