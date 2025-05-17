import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { makeResume } from "./makeResume";

export async function POST(req: NextRequest) {
	// Create path to the file from the root directory
	const guidelinePath = path.join(
		process.cwd(),
		"src",
		"app",
		"api",
		"make-resume",
		"txt",
		"guideline.txt",
	);

	const promptPath = path.join(
		process.cwd(),
		"src",
		"app",
		"api",
		"make-resume",
		"txt",
		"prompt.txt",
	);

	try {
		const guideline = fs.readFileSync(guidelinePath, "utf8");
		const prompt = fs.readFileSync(promptPath, "utf8");
		const updatedPrompt = `${prompt}. 
			Guideline:
			${guideline}
Job Description and User Data:
${await req.text()}
`;
		const resume = await makeResume(updatedPrompt);
		console.log(resume);
		return NextResponse.json({ resume });
	} catch (error) {
		console.error("error reading file", error);
		return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
	}
}
