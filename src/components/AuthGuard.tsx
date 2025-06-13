import { LogIn } from "lucide-react";
import NavBar from "./navbar";
import { getCookies } from "@/lib/getCookies";

export default async function AuthGaurd() {
	const userData = await getCookies();

	return (
		<>
			<NavBar userData={userData} />
			<div className="bg-purple-50 h-screen">
				<div className=" flex items-center justify-center mt-32">
					<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
						<div className="mb-6">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<LogIn className="w-8 h-8 text-blue-600" />
							</div>
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								Welcome!
							</h2>
							<p className="text-gray-600">
								Please log in to access your create job ready resume.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
