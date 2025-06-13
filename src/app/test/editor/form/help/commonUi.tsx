export const commonClass = () => {
	const removeBtnClass =
		"absolute top-2 right-2 px-3 py-1 text-xs bg-red-500 text-white rounded-full hover:bg-red-600";
	const addBtnClass =
		"mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700";

	const commonDivClass = "relative p-4 border rounded-md bg-white shadow-sm";

	return { removeBtnClass, addBtnClass, commonDivClass };
};
