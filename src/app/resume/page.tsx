"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResumeEditor from "./resume-editor/editor";
import PDFUploader from "./PDFUploader";
import HandleJd from "./handleJd";
import { getDbRef } from "@/lib/dbRef";
import { get } from "firebase/database";
import { FileText, Briefcase, LogIn } from "lucide-react";

export default function PDFUploadPage() {
	const [hasResumeData, setHasResumeData] = useState<boolean | null>(null);
	const [activeTab, setActiveTab] = useState<"resume" | "jd">("jd");
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		// Check if user is authenticated
		const uid = localStorage.getItem("uid");
		if (!uid) {
			setIsAuthenticated(false);
			setShowLoginPopup(true);
			return;
		}

		setIsAuthenticated(true);

		const asyncOpration = async () => {
			const dbRef = getDbRef();
			const snapshot = await get(dbRef);
			const data = snapshot.val();
			setHasResumeData(!!data);
		};
		asyncOpration();
	}, []);

	const handleUploadSuccess = () => {
		setHasResumeData(true);
	};

	const handleGetStarted = () => {
		router.push("/login");
	};

	// Show loading state while checking authentication
	if (isAuthenticated === null) {
		return null;
	}

	// Show login popup if not authenticated
	if (!isAuthenticated && showLoginPopup) {
		return (
			<div className=" flex items-center justify-center mt-32">
				<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
					<div className="mb-6">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<LogIn className="w-8 h-8 text-blue-600" />
						</div>
						<h2 className="text-2xl font-bold text-gray-800 mb-2">
							Welcome Back!
						</h2>
						<p className="text-gray-600">
							Please log in to access your resume editor and job description
							tools.
						</p>
					</div>

					<button
						onClick={handleGetStarted}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
					>
						<LogIn className="w-5 h-5" />
						<span>Get Started</span>
					</button>
				</div>
			</div>
		);
	}

	// Show loading state while fetching resume data
	if (hasResumeData === null) {
		return null;
	}

	return (
		<div className="min-h-screen bg-purple-50">
			<div className="lg:hidden bg-white shadow-sm border-b border-gray-100">
				<div className="container mx-auto px-4 py-6">
					<div className="flex justify-center">
						<div className="bg-gray-100 p-1 rounded-xl shadow-inner">
							<div className="flex space-x-1" role="group">
								<button
									type="button"
									className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${activeTab === "jd"
											? "bg-indigo-600 text-white shadow-lg transform scale-105"
											: "text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-sm"
										}`}
									onClick={() => setActiveTab("jd")}
								>
									<Briefcase className="w-4 h-4 mr-2" />
									Job Description
								</button>
								<button
									type="button"
									className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${activeTab === "resume"
											? "bg-indigo-600 text-white shadow-lg transform scale-105"
											: "text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-sm"
										}`}
									onClick={() => setActiveTab("resume")}
								>
									<FileText className="w-4 h-4 mr-2" />
									Edit Resume
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex">
				<div className="hidden lg:block w-64 bg-white shadow-lg border-r border-gray-200 flex-shrink-0 min-h-screen">
					<div className="p-6">
						<div className="mb-8">
							<h2 className="text-xl font-bold text-gray-800">Menu</h2>
						</div>
						<nav className="space-y-2">
							<button
								type="button"
								className={`w-full px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${activeTab === "jd"
										? "bg-indigo-600 text-white shadow-md"
										: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
									}`}
								onClick={() => setActiveTab("jd")}
							>
								<Briefcase className="w-5 h-5 mr-3" />
								Job Description
							</button>
							<button
								type="button"
								className={`w-full px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${activeTab === "resume"
										? "bg-indigo-600 text-white shadow-md"
										: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
									}`}
								onClick={() => setActiveTab("resume")}
							>
								<FileText className="w-5 h-5 mr-3" />
								Edit Resume
							</button>
						</nav>
					</div>
				</div>

				<div className="flex-1 p-4 lg:p-6">
					<div className="transition-all duration-300 ease-in-out mt-6 lg:mt-2">
						{activeTab === "resume" && (
							<div className="resume-section animate-fadeIn">
								<PDFUploader onUploadSuccess={handleUploadSuccess} />
								<ResumeEditor />
							</div>
						)}
						{activeTab === "jd" && (
							<div className="jd-section animate-fadeIn">
								<HandleJd />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
