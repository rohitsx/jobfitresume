export const commonClass = () => {
	const removeBtnClass =
		"absolute top-3 right-3 px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600";
	const addBtnClass =
		"mt-6 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600";

	const commonDivClass = "relative p-9 border rounded-md bg-white shadow-sm";

	return { removeBtnClass, addBtnClass, commonDivClass };
};
