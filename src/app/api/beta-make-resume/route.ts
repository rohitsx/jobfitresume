import { NextRequest, NextResponse } from "next/server";
import { makeResume } from "./makeResume";
import { Prompt } from "./prompt";

export async function POST(req: NextRequest) {
  const body = await req.text();
  try {
    const updatedPrompt = `${Prompt}. 
			Job Description and User Data:
			${body}
			`;
    const resume = await makeResume(updatedPrompt);

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("error reading file", error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
