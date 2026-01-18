import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Crown } from "lucide-react";

export const TierPopup = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (v: boolean) => void;
}) => (
	<Dialog open={open} onOpenChange={setOpen}>
		<DialogContent>
			<div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
				<Crown className="w-8 h-8 text-white" />
			</div>

			<DialogHeader className="items-center">
				<DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
					Free Tier Limit Reached
				</DialogTitle>
				<DialogDescription className="text-gray-600 mb-6">
					You've used all your free resume generations! Upgrade to Premium to
					create unlimited AI-tailored resumes.
				</DialogDescription>
			</DialogHeader>

			{/* Features List */}
			<div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
				<h4 className="font-semibold text-gray-800 mb-2">Premium Benefits:</h4>
				<ul className="text-sm text-gray-600 space-y-1">
					<li>• Unlimited resume generations</li>
					<li>• Priority support</li>
				</ul>
			</div>

			<div className="flex flex-col space-y-3">
				<a
					href="/pricing"
					className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl text-center"
				>
					Upgrade to Premium
				</a>
				<button
					onClick={() => setOpen(false)}
					className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 px-6 rounded-xl transition-colors duration-200"
				>
					Maybe Later
				</button>
			</div>
		</DialogContent>
	</Dialog>
);
