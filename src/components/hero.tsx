"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"; // Adjust this import path based on your project structure
import { PlayCircle } from "lucide-react";

const HeroSection = () => {
	const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/ruUl1iP9fH8";

	return (
		<section className="pt-16 pb-10 sm:pt-32 sm:pb-30 overflow-hidden">
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
				<div className="absolute w-96 h-96 bg-indigo-500 rounded-full opacity-20 blur-3xl -top-10 -left-10"></div>
				<div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl top-40 right-20"></div>
			</div>

			<div className="container mx-auto px-6">
				<div className="flex flex-col lg:flex-row items-center gap-12">
					<div className="lg:w-1/2 space-y-6">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-4 h-4"
							>
								<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1.25 14.75l-4-4 1.5-1.5 2.5 2.5 6-6 1.5 1.5-7.5 7.5z"></path>
							</svg>
							AI-Powered Resume Builder
						</div>
						<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
							Land Job{" "}
							<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
								5X Faster With
							</span>{" "}
							JobFit Resume
						</h1>
						<p className="text-lg text-gray-600 md:text-xl max-w-md">
							instantly analyze job descriptions and craft resumes that make you
							stand out.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 pt-2">
							<a
								href="/resume"
								className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-center"
							>
								Create Your Resume
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-4 h-4"
								>
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</a>
							<a
								href="#how-it-works"
								className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 text-center"
							>
								See How It Works
							</a>
						</div>
						{/* Added "No credit card required" below the buttons */}
						<p className="text-sm text-gray-500 flex items-center gap-1 pt-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-4 h-4 text-green-500"
							>
								<path
									fillRule="evenodd"
									d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
									clipRule="evenodd"
								/>
							</svg>
							No credit card required
						</p>
					</div>

					{/* --- Video Preview and Dialog Integration --- */}
					<div className=" lg:w-1/2 relative">
						<Dialog>
							<DialogTrigger asChild>
								<div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100 relative z-10 cursor-pointer group hover:scale-[1.01] transition-transform duration-200">
									<div className="w-full h-64 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center overflow-hidden relative">
										<img
											src="./1.png"
											alt="Video Thumbnail"
											className="absolute inset-0 w-full h-full object-cover rounded-xl"
										/>
										<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all rounded-xl">
											<PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
										</div>
									</div>
									<p className="text-indigo-600 font-semibold text-center mt-4">
										Watch demo video
									</p>
								</div>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[700px] w-full p-0 overflow-hidden">
								<DialogHeader className="hidden">
									<DialogTitle>Video Demo</DialogTitle>
									<DialogDescription>
										Watch a quick demo of how JobFit Resume works.
									</DialogDescription>
								</DialogHeader>
								<div
									className="relative w-full"
									style={{ paddingBottom: "56.25%" /* 16:9 Aspect Ratio */ }}
								>
									<iframe
										className="absolute top-0 left-0 w-full h-full rounded-md"
										src={YOUTUBE_EMBED_URL}
										title="YouTube video player"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										allowFullScreen
									></iframe>
								</div>
							</DialogContent>
						</Dialog>

						{/* Decorative elements */}
						<div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 rounded-xl -z-10 opacity-70 rotate-12"></div>
						<div className="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-200 rounded-full -z-10 opacity-70"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
