import { ReactNode } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
	FormFieldProps,
	FormInputCheckboxProps,
	FormInputDateProps,
	FormInputSelectProps,
	FormInputTextProps,
	HeadingDivProps,
} from "@/types/Form.types";

// A reusable hook to simplify updating the Zustand store
// This abstracts the `updateResumeData` call, making components cleaner.
const useUpdateResume = () => {
	const update = useResumeStore((state) => state.updateResumeData);
	return (path: (string | number)[], value: any) => {
		update({ path, value });
	};
};

// Wrapper for a label and its input field
export const FormField = ({ label, children, fullWidth }: FormFieldProps) => (
	<div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
		<label className="text-sm font-medium text-gray-700">{label}</label>
		{children}
	</div>
);

// Container for laying out form fields in a grid
export const CellContainer = ({ children }: { children: ReactNode }) => (
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">{children}</div>
);

// Expandable Section Heading
export const HeadingDiv = ({ heading, children }: HeadingDivProps) => (
	<details open className="group">
		<summary className="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-100 rounded-t-lg">
			<h2 className="text-xl font-semibold text-gray-800">{heading}</h2>
			<span className="transition-transform transform group-open:rotate-180">
				▼
			</span>
		</summary>
		<div className="p-4 border border-t-0 border-gray-200 rounded-b-lg">
			{children}
		</div>
	</details>
);

// Standard Text Input
export const InputText = ({ input }: FormInputTextProps) => {
	const updateResume = useUpdateResume();
	return (
		<input
			type="text"
			defaultValue={input.defaultValue}
			placeholder={input.placeholder}
			onChange={(e) => updateResume(input.path, e.target.value)}
			className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
		/>
	);
};

// Text Area Input
export const TextArea = ({ input }: FormInputTextProps) => {
	const updateResume = useUpdateResume();
	return (
		<textarea
			defaultValue={input.defaultValue}
			placeholder={input.placeholder}
			onChange={(e) => updateResume(input.path, e.target.value)}
			className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full min-h-[100px]"
		/>
	);
};

// Select Dropdown
export const Select = ({ input, options }: FormInputSelectProps) => {
	const updateResume = useUpdateResume();
	return (
		<select
			defaultValue={input.defaultValue}
			onChange={(e) => updateResume(input.path, e.target.value)}
			className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
		>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

// Checkbox Input
export const Checkbox = ({ checked, label, path }: FormInputCheckboxProps) => {
	const updateResume = useUpdateResume();
	return (
		<div className="flex items-center gap-2">
			<input
				type="checkbox"
				defaultChecked={checked}
				onChange={(e) => updateResume(path, e.target.checked)}
				className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
			/>
			<label className="text-sm text-gray-700">{label}</label>
		</div>
	);
};

// Date Input
export const InputDate = ({ defaultValue, path }: FormInputDateProps) => {
	const updateResume = useUpdateResume();
	// HTML date input expects 'YYYY-MM-DD' format. We slice to ensure compatibility.
	const formattedDate = defaultValue ? defaultValue.slice(0, 10) : "";

	return (
		<input
			type="date"
			defaultValue={formattedDate}
			onChange={(e) => updateResume(path, e.target.value)}
			className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
		/>
	);
};

// Specialized Input for comma-separated values that become string[]
interface InputCommaSeparatedProps extends FormInputProps<string[]> { }

export const InputCommaSeparated = ({ input }: InputCommaSeparatedProps) => {
	const updateResume = useUpdateResume();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const keywordsArray = value
			.split(",")
			.map((k) => k.trim())
			.filter(Boolean); // Trim and remove empty strings
		updateResume(input.path, keywordsArray);
	};

	return (
		<input
			type="text"
			defaultValue={input.defaultValue?.join(", ")}
			placeholder={input.placeholder}
			onChange={handleChange}
			className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full"
		/>
	);
};
