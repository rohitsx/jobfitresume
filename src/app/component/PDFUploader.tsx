import { useState } from "react";

interface PDFUploaderProps {
	onUploadSuccess: () => void;
}

export default function PDFUploader({ onUploadSuccess }: PDFUploaderProps) {
	const [isUploading, setIsUploading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsUploading(true);

		const form = e.currentTarget;
		const fileInput = form.elements.namedItem("pdf") as HTMLInputElement;
		const file = fileInput?.files?.[0];

		if (!file || file.type !== "application/pdf") {
			alert("Please select a valid PDF file.");
			setIsUploading(false);
			return;
		}

		const formData = new FormData();
		formData.append("pdf", file);

		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (res.ok) {
				const { resume: resumeData } = await res.json();
				localStorage.setItem("resumeData", JSON.stringify(resumeData));
				alert("PDF uploaded and parsed successfully!");
				onUploadSuccess();
			} else {
				alert("Upload failed.");
			}
		} catch (err) {
			console.error(err);
			alert("Something went wrong.");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="mt-8 mb-8">
			<h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-6">
				<div className="flex items-center space-x-4">
					<input
						type="file"
						name="pdf"
						accept="application/pdf"
						className="flex-1 border border-gray-300 rounded p-2"
						disabled={isUploading}
					/>
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
						disabled={isUploading}
					>
						{isUploading ? "Uploading..." : "Upload PDF"}
					</button>
				</div>
			</form>
		</div>
	);
}
