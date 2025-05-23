const Footer = () => {
	return (
		<footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
			<div className="container mx-auto">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					<div>
						<div className="flex items-center gap-2 mb-6">
							<div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
								JF
							</div>
							<span className="font-bold text-xl text-white">
								JobFit Resume
							</span>
						</div>
						<p className="text-gray-400 mb-6">
							Our AI-powered platform helps you create perfectly tailored
							resumes that get you noticed by employers and land more
							interviews.
						</p>
						<div className="flex space-x-4">
							{/* Social media icons */}
							{["twitter", "linkedin", "instagram"].map((platform) => (
								<a
									key={platform}
									href="#"
									className="text-gray-400 hover:text-indigo-400 transition-colors"
								>
									<div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center">
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
											<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
										</svg>
									</div>
								</a>
							))}
						</div>
					</div>

					<div>
						<h3 className="font-semibold text-white text-lg mb-4">Product</h3>
						<ul className="space-y-2">
							{[
								"Features",
								"Pricing",
								"Templates",
								"Examples",
								"Integration",
							].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="font-semibold text-white text-lg mb-4">Resources</h3>
						<ul className="space-y-2">
							{["Blog", "Help Center", "Guides", "API Docs", "Contact"].map(
								(item) => (
									<li key={item}>
										<a
											href="#"
											className="text-gray-400 hover:text-white transition-colors"
										>
											{item}
										</a>
									</li>
								),
							)}
						</ul>
					</div>

					<div>
						<h3 className="font-semibold text-white text-lg mb-4">Company</h3>
						<ul className="space-y-2">
							{[
								"About",
								"Careers",
								"Privacy Policy",
								"Terms of Service",
								"Security",
							].map((item) => (
								<li key={item}>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-500">
						© {new Date().getFullYear()} JobFit Resume. All rights reserved.
					</p>
					<div className="mt-4 md:mt-0 space-x-4">
						<a
							href="#"
							className="text-gray-400 hover:text-white transition-colors text-sm"
						>
							Privacy Policy
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-white transition-colors text-sm"
						>
							Terms of Service
						</a>
						<a
							href="#"
							className="text-gray-400 hover:text-white transition-colors text-sm"
						>
							Data Policy
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
