"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, AlertCircle, X, Crown } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

export default function HandleJd() {
	const router = useRouter();
	const { resumeData } = useResumeStore();
	const [jobDescription, setJobDescription] = useState("");
	const { uid } = useResumeStore();
	const [isCreatingResume, setIsCreatingResume] = useState(false);
	const [error, setError] = useState("");
	const [showPricingPopup, setShowPricingPopup] = useState(false);

	const handleCreateResume = async () => {
		if (!jobDescription.trim()) {
			setError("Please enter a job description");
			return;
		}

		if (!resumeData) {
			setError("Please add your resume before proceeding");
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
				body: JSON.stringify({ jobDescription, resumeData, uid }),
			});

			const data = await response.json();

			if (!response.ok) {
				if (data.error === "Free tier limit reached") {
					setShowPricingPopup(true);
					return;
				}
				setError("Failed to create resume. Please try again.");
				return;
			}

			localStorage.removeItem("generatedResumeData");
			localStorage.setItem("generatedResumeData", JSON.stringify(data));
			router.push("/template");
		} catch (err) {
			setError("Failed to create resume. Please try again.");
			console.error(err);
		} finally {
			setIsCreatingResume(false);
		}
	};

	const handleUpgrade = () => {
		setShowPricingPopup(false);
		router.push("/pricing");
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					AI-Powered Resume Generator
				</h1>
			</div>

			{/* Main Content Card */}
			<div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
				<div className="p-6 space-y-6">
					<div>
						<div className="flex items-center justify-between mb-3">
							<label
								htmlFor="jobDescription"
								className="text-lg font-semibold text-gray-800 flex items-center"
							>
								Job Description
								<span className="text-red-500 ml-1">*</span>
							</label>
						</div>

						<div className="relative">
							<textarea
								id="jobDescription"
								className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 min-h-48 text-gray-700 placeholder-gray-400 shadow-sm"
								placeholder="Paste the complete job description here... "
								value={jobDescription}
								onChange={(e) => setJobDescription(e.target.value)}
							/>
							<div className="absolute bottom-3 right-3 flex items-center space-x-2">
								<span className="text-xs text-gray-400 bg-white px-2 py-1 rounded ">
									{jobDescription.length} characters
								</span>
							</div>
						</div>

						{/* Help Text */}
						<div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
							<div className="flex items-start">
								<div className="flex-shrink-0">
									<div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
										<span className="text-blue-600 text-xs font-bold">💡</span>
									</div>
								</div>
								<div className="ml-3">
									<p className="text-sm text-blue-800 font-medium">Pro Tip</p>
									<p className="text-sm text-blue-700 mt-1">
										Copy the entire job posting including requirements,
										responsibilities, and qualifications. Our AI will analyze
										every detail to create the most relevant resume possible.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Error Message */}
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
							<AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
							<div>
								<p className="text-red-800 font-medium">
									Oops! Something went wrong
								</p>
								<p className="text-red-700 text-sm mt-1">{error}</p>
							</div>
						</div>
					)}

					{/* Action Button */}
					<div className="flex flex-col items-center pt-4 space-y-3">
						<button
							className={`group relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg min-w-64 justify-center ${isCreatingResume
									? "bg-indigo-600 cursor-not-allowed scale-100 hover:scale-100"
									: "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl"
								}`}
							onClick={handleCreateResume}
							disabled={isCreatingResume}
						>
							{isCreatingResume ? (
								<>
									<div className="flex items-center space-x-3">
										{/* Relaxing breathing dots animation */}
										<div className="flex space-x-1">
											<div
												className="w-2 h-2 bg-white rounded-full animate-pulse"
												style={{
													animationDelay: "0ms",
													animationDuration: "1500ms",
												}}
											></div>
											<div
												className="w-2 h-2 bg-white rounded-full animate-pulse"
												style={{
													animationDelay: "200ms",
													animationDuration: "1500ms",
												}}
											></div>
											<div
												className="w-2 h-2 bg-white rounded-full animate-pulse"
												style={{
													animationDelay: "400ms",
													animationDuration: "1500ms",
												}}
											></div>
										</div>
										<span className="animate-pulse">
											Crafting your perfect resume...
										</span>
									</div>
								</>
							) : (
								<>
									<Zap className="w-5 h-5 mr-3 " />
									<span>Generate AI-Tailored Resume</span>
								</>
							)}
						</button>

						{/* Loading message outside button */}
						{isCreatingResume && (
							<div className="text-gray-600 text-sm text-center">
								This usually takes 30-45 seconds, so sit back and let the AI do
								the work for you
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Pricing Popup */}
			{showPricingPopup && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
						<div className="relative p-6">
							{/* Close Button */}
							<button
								onClick={() => setShowPricingPopup(false)}
								className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
							>
								<X className="w-6 h-6" />
							</button>

							{/* Content */}
							<div className="text-center">
								{/* Icon */}
								<div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<Crown className="w-8 h-8 text-white" />
								</div>

								{/* Title */}
								<h3 className="text-2xl font-bold text-gray-900 mb-2">
									Free Tier Limit Reached
								</h3>

								{/* Description */}
								<p className="text-gray-600 mb-6">
									You've used all your free resume generations! Upgrade to
									Premium to create unlimited AI-tailored resumes and unlock
									advanced features.
								</p>

								{/* Features List */}
								<div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
									<h4 className="font-semibold text-gray-800 mb-2">
										Premium Benefits:
									</h4>
									<ul className="text-sm text-gray-600 space-y-1">
										<li>• Unlimited resume generations</li>
										<li>• Advanced AI customization</li>
										<li>• Premium templates</li>
										<li>• Priority support</li>
									</ul>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-col space-y-3">
									<button
										onClick={handleUpgrade}
										className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
									>
										Upgrade to Premium
									</button>
									<button
										onClick={() => setShowPricingPopup(false)}
										className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 px-6 rounded-xl transition-colors duration-200"
									>
										Maybe Later
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
