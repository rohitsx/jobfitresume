import Icon from "./icon";
import { IconName } from "@/types/types"; // Add this import

const HowItWorksSection = () => {
	const steps: Array<{
		step: number;
		title: string;
		description: string;
		icon: IconName; // Explicitly type this as IconName
	}> = [
			{
				step: 1,
				title: "Upload Your Resume",
				description:
					"Provide your existing resume in PDF. This gives our AI a strong foundation to work with.",
				icon: "UPLOAD",
			},
			{
				step: 2,
				title: "Review & Enhance",
				description:
					"Our AI parses your resume. Review the extracted data and add any missing projects, experiences, or skills.",
				icon: "EDIT",
			},
			{
				step: 3,
				title: "Paste the Job Description",
				description:
					"Copy the full job description you're applying for. The more detail, the better the AI can tailor your resume.",
				icon: "PASTE",
			},
			{
				step: 4,
				title: "Generate Your Tailored Resume",
				description:
					"Watch as our AI, powered by Gemini and other models, crafts a resume perfectly optimized for that specific job.",
				icon: "MAGIC",
			},
		];
	return (
		<section id="how-it-works" className="py-24 bg-white px-6">
			<div className="container mx-auto">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4"
						>
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"></path>
						</svg>
						Simple Process
					</div>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Get Your Perfect Resume in 4 Simple Steps
					</h2>
					<p className="text-gray-600 md:text-lg">
						Our intuitive process takes you from an ordinary resume to a
						perfectly tailored one in minutes.
					</p>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{steps.map((step) => (
						<div
							key={step.step}
							className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all p-6 relative"
						>
							<div className="absolute -top-5 left-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md">
								{step.step}
							</div>
							<div className="pt-4">
								<div className="mb-4 text-indigo-600">
									<Icon name={step.icon} />
								</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									{step.title}
								</h3>
								<p className="text-gray-600">{step.description}</p>
							</div>
						</div>
					))}
				</div>
				<div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
					<div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="w-8 h-8"
						>
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
						</svg>
					</div>
					<div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Powered by cutting-edge AI
						</h3>
						<p className="text-gray-700">
							Our platform leverages{" "}
							<span className="font-semibold text-indigo-600">
								Google&apos;s Gemini
							</span>{" "}
							and other leading large language models for superior resume
							generation that gets you noticed.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
export default HowItWorksSection;
