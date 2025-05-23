const FaqSection = () => {
	const faqs = [
		{
			question: "How does the AI tailoring actually work?",
			answer:
				"Our AI analyzes both your resume and the job description, identifying key skills, requirements, and terminology. It then restructures your resume to highlight the most relevant experiences and achievements, ensuring alignment with what employers are looking for.",
		},
		{
			question: "Will my information be secure?",
			answer:
				"Absolutely. We implement enterprise-grade encryption and security protocols. Your data is never shared with third parties, and you can request deletion of your information at any time from your account settings.",
		},
		{
			question: "Can I really use this for free?",
			answer:
				"Yes! Our Basic plan allows you to create one AI-tailored resume per month at no cost. This gives you a chance to experience the value before deciding if you need more capacity with our paid plans.",
		},
		{
			question: "How much time will this save me?",
			answer:
				"On average, our users report saving 45-60 minutes per job application. What would typically take 1-2 hours of manual resume editing now takes just minutes with our AI-powered platform.",
		},
	];

	return (
		<section className="py-24 bg-gray-50 px-6">
			<div className="container mx-auto">
				<div className="text-center max-w-2xl mx-auto mb-16">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-4 h-4"
						>
							<path d="M9.25 12a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0v-1.5h1.5a.75.75 0 000-1.5h-1.5v-1.5a.75.75 0 00-1.5 0v1.5h-1.5z" />
							<path
								fillRule="evenodd"
								d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z"
								clipRule="evenodd"
							/>
						</svg>
						Common Questions
					</div>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-gray-600 md:text-lg">
						Everything you need to know about JobFit Resume and our AI-powered
						platform.
					</p>
				</div>

				<div className="max-w-3xl mx-auto">
					<div className="space-y-6">
						{faqs.map((faq, index) => (
							<div
								key={index}
								className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
							>
								<h3 className="text-xl font-semibold text-gray-900 mb-3">
									{faq.question}
								</h3>
								<p className="text-gray-600">{faq.answer}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default FaqSection;
