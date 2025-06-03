import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

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

  console.log(payload);

  return NextResponse.json({ received: true }, { status: 200 });
}
