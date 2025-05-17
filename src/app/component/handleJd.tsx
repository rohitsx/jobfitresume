import { useState } from "react";

export default function HandleJd() {
	const [jobDescription, setJobDescription] = useState("");
	const [isCreatingResume, setIsCreatingResume] = useState(false);
	const [error, setError] = useState("");

	const handleCreateResume = async () => {
		if (!jobDescription.trim()) {
			setError("Please enter a job description");
			return;
		}

		const resumeData = localStorage.getItem("resumeData");

		if (!resumeData) {
			setError("Please Added Resume Before proceeding");
			return;
		}

		try {
			setIsCreatingResume(true);
			setError("");

			const response = await fetch("/api/make-resume", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ jobDescription, resumeData }),
			});

			if (!response.ok) {
				throw new Error("Failed to create resume");
			}

			const data = await response.json();

			localStorage.setItem("newResume", JSON.stringify(data));
		} catch (err) {
			setError("Failed to create resume. Please try again.");
			console.error(err);
		} finally {
			setIsCreatingResume(false);
		}
	};

	return (
		<>
			<div>
				<div className="mt-8 mb-8 p-6 border rounded-lg shadow-sm">
					<h2 className="text-xl font-semibold mb-4">
						Create Resume from Job Description
					</h2>
					<p className="mb-4 text-gray-600">
						Enter the job description below and click "Create Resume" to
						generate a targeted resume.
					</p>

					<div className="mb-4">
						<label htmlFor="jobDescription" className="block mb-2 font-medium">
							Job Description:
						</label>
						<textarea
							id="jobDescription"
							className="w-full p-3 border rounded-md min-h-32"
							placeholder="Paste the job description here..."
							value={jobDescription}
							onChange={(e) => setJobDescription(e.target.value)}
						/>
					</div>

					{error && <p className="text-red-500 mb-4">{error}</p>}

					<button
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
						onClick={handleCreateResume}
						disabled={isCreatingResume}
					>
						{isCreatingResume ? "Creating Resume..." : "Create Resume"}
					</button>
				</div>
			</div>
		</>
	);
}
