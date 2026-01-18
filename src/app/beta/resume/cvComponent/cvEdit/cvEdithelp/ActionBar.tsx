export const ActionBar = ({
	onSave,
	hasChanges,
}: {
	onSave: () => void;
	hasChanges: boolean;
}) => (
	<div className="fixed bottom-0 w-5/6 backdrop-blur-xs bg-white/60 pb-6 pt-4 pr-38 border-t border-t-gray-200 flex justify-end ">
		<button
			onClick={onSave}
			disabled={!hasChanges}
			className={`border border-gray-200  rounded-xl w-xs text-white p-3 shadow-lg hover:shadow-xl transition flex justify-center items-center gap-2 duration-300 ease-in-out ${hasChanges
				? "bg-indigo-600 cursor-pointer"
				: "bg-indigo-400 cursor-not-allowed"
				}`}
		>
			Save Changes
		</button>
	</div>
);
