import { NextRequest, NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse";
import { extractResumeData } from "./extractResumeData";

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get("pdf") as File;

		if (!file || file.type !== "application/pdf") {
			return NextResponse.json({ error: "Invalid file" }, { status: 400 });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const data = await pdf(buffer);
		const resume = await extractResumeData(data.text);

		return NextResponse.json({
			message: "File uploaded successfully",
			resume,
		});
	} catch (error) {
		console.error("Error processing PDF:", error);
		return NextResponse.json(
			{ error: "Failed to process PDF" },
			{ status: 500 },
		);
	}
}
