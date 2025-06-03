import { NextRequest, NextResponse } from "next/server";
import { makeResume } from "./makeResume";
import { getDbRef } from "@/lib/dbRef";
import { get, update } from "firebase/database";
import { Prompt } from "./prompt";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const { uid } = JSON.parse(body);
  const todayDate = new Date().toISOString().split("T")[0];

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

  let tierCount = tier.count;
  new Date(todayDate) > new Date(tier.date) && (tierCount = 0);

  if (todayDate == tier.date) {
    console.log({ todayDate, tier });

    if (tier.type === "free" && tier.count > 3)
      return NextResponse.json(
        { error: "Free tier limit reached" },
        { status: 403 },
      );

    if (tier.type === "Standard" && tier.count > 20)
      return NextResponse.json(
        { error: "Standard tier limit reached" },
        { status: 403 },
      );
  }

  tierCount++;
  try {
    const updatedPrompt = `${Prompt}. 
			Job Description and User Data:
			${body}
			`;
    const resume = await makeResume(updatedPrompt);

    await update(dbRef, {
      tier: { count: tierCount, date: todayDate, type: tier.type },
    });
    return NextResponse.json({ resume });
  } catch (error) {
    console.error("error reading file", error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
