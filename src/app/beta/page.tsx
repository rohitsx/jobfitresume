"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Corrected import for Next.js 13+
import { ChevronLeft } from "lucide-react";

export default function Page() {
	const [name, setName] = useState("");
	const router = useRouter();

	const handleNextClick = () => {
		if (name.trim() === "") {
			alert("Please enter your name.");
			return;
		}
		const randomNumber = Math.floor(Math.random() * 100000); // Adjust range as needed
		const betaUrl = `beta-${randomNumber}`;
		router.push(
			`/beta/resume/?name=${encodeURIComponent(name)}&id=${betaUrl}#upload-resume`,
		);
	};

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-12">
			<div className="max-w-md mx-auto mb-4">
				<button
					onClick={() => (window.location.href = "/")}
					className="inline-flex cursor-pointer items-center px-3 py-2 gap-1 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
				>
					<ChevronLeft /> <p>Go Back</p>
				</button>
			</div>

			<div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
				<div className="space-y-6">
					<div className="space-y-4">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<div className="mt-1">
							<input
								type="text"
								name="name"
								id="name"
								className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
								placeholder="Enter your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<button
							onClick={handleNextClick}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 "
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
