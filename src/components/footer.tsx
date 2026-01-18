const Footer = () => {
	return (
		<footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
			<div className="container mx-auto">
				<div className="mb-16">
					<div className="flex items-center gap-2 mb-6">
						<div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
							JF
						</div>
						<span className="font-bold text-xl text-white">
							JobFit Resume
						</span>
					</div>
					<p className="text-gray-400 mb-6 max-w-md">
						Our AI-powered platform helps you create perfectly tailored
						resumes that get you noticed by employers and land more
						interviews.
					</p>
				</div>

				<div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
					<p className="text-gray-500 text-sm">
						© 2026 JobFit Resume. All rights reserved.
					</p>
					<div className="mt-4 md:mt-0 space-x-6 text-sm text-gray-500">
						<span>Privacy Policy</span>
						<span>Terms of Service</span>
						<span>Data Policy</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;