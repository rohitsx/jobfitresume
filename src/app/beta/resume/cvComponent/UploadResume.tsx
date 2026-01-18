"use client";
import { useErrorStore } from "@/store/store.error";
import { SnapSection } from "../cvUtil/SnapSection";
import { Loader2Icon, Upload, UploadCloud, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { getBetaDbRef } from "@/lib/dbRef";
import { update } from "firebase/database";
import { useRouter, useSearchParams } from "next/navigation";

export const UploadResume = () => {
	const [parseResume, setParseResume] = useState(false);
	const [pdf, setPdf] = useState<File | null>(null);
	const { setError } = useErrorStore();
	const [isDragging, setIsDragging] = useState(false);
	const { uid, setResumeData } = useResumeStore();
	const searchParams = useSearchParams();
	const router = useRouter();

	const handleFileSelect = (file: File) => {
		if (file.type !== "application/pdf") {
			setError("Please select a valid PDF file.");
			return;
		}
		setPdf(file);
		setError(null);
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFileSelect(e.target.files[0]);
		}
	};

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setIsDragging(true);
		} else if (e.type === "dragleave") {
			setIsDragging(false);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFileSelect(e.dataTransfer.files[0]);
		}
	};

	const handleSubmit = async () => {
		if (!pdf) return setError("Please select a PDF file first.");
		setParseResume(true);

		const formData = new FormData();
		formData.append("pdf", pdf);

		try {
			const res = await fetch("/api/upload-pdf", {
				method: "POST",
				body: formData,
			});

			if (res.ok) {
				const { resume } = await res.json();

				if (!uid) return setError("Client Error. Please refresh the page.");

				const dbRef = getBetaDbRef(uid);
				update(dbRef, {
					resumeData: resume,
				});

				setResumeData(resume);

				alert("PDF uploaded and parsed successfully!");

				const name = searchParams.get("name");

				window.location.hash = `#job-description`;

				setPdf(null);
			} else {
				setError("Upload Failed, Please Try Again");
			}
		} catch (err) {
			console.log(err);
			setError("Somthing went wrong");
		} finally {
			setParseResume(false);
		}
	};

	return (
		<SnapSection Icon={Upload} value="Upload Resume" id="upload-resume">
			<div className="space-y-3">
				<h1 className="text-4xl text-black">Upload Resume</h1>
				<p>Upload your PDF resume to parse and extract information. </p>
			</div>
			<div className="h-80 xl:h-100 mt-20 space-y-10 justify-center px-4 lg:px-20 flex flex-col">
				<div
					className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-2xl bg-white shadow-sm h-full p-4 mx-10 ${isDragging ? "border-indigo-600" : "border-gray-200"
						}`}
					onDragEnter={handleDrag}
					onDragOver={handleDrag}
					onDragLeave={handleDrag}
					onDrop={handleDrop}
					onClick={() => document.getElementById("fileInput")?.click()}
				>
					<UploadCloud className="w-10 h-10 mb-4 text-gray-400" />
					<p className="text-center font-medium">
						{pdf ? `Selected: ${pdf.name}` : "Click or drag & drop PDF here"}
					</p>
					<p className="text-sm text-gray-400">(Only .pdf files are allowed)</p>

					<input
						id="fileInput"
						type="file"
						accept="application/pdf"
						className="hidden"
						onChange={(e) => handleFileUpload(e)}
					/>
				</div>
				<button
					className={`border border-gray-200 rounded-xl w-3/4 text-white p-3 shadow-lg hover:shadow-xl transition mx-auto flex justify-center items-center gap-2 cursor-pointer duration-300 ease-in-out ${pdf ? "bg-indigo-600 " : "bg-indigo-500"
						}`}
					onClick={handleSubmit}
					disabled={parseResume}
				>
					{parseResume ? (
						<>
							<Loader2Icon className="animate-spin size-5" />
							Processing Resume...
						</>
					) : (
						<>
							<UploadIcon className="size-5" />
							Analyze Resume
						</>
					)}
				</button>
			</div>
		</SnapSection>
	);
};
