import { ReactNode } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
	FormFieldProps,
	FormInputCheckboxProps,
	FormInputDateProps,
	FormInputSelectProps,
	FormInputTextProps,
	HeadingDivProps,
	InputCommaSeparatedProps,
} from "@/types/Form.types";

const useUpdateDraft = () => useResumeStore((state) => state.updateDraftData);

export const FormField = ({ label, children, fullWidth }: FormFieldProps) => (
	<div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
		<label className="text-sm font-medium text-gray-700">{label}</label>
		{children}
	</div>
);

export const CellContainer = ({ children }: { children: ReactNode }) => (
	<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">{children}</div>
);

export const HeadingDiv = ({ heading, children }: HeadingDivProps) => (
	<details className="group">
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

const commonInputClass =
	"p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full";

export const InputText = ({ input }: FormInputTextProps) => {
	const updateDraft = useUpdateDraft();
	return (
		<input
			key={input.path.join("-")}
			type="text"
			defaultValue={input.defaultValue}
			placeholder={input.placeholder}
			onChange={(e) => updateDraft({ path: input.path, value: e.target.value })}
			className={commonInputClass}
		/>
	);
};

export const TextArea = ({ input }: FormInputTextProps) => {
	const updateDraft = useUpdateDraft();
	return (
		<textarea
			key={input.path.join("-")}
			defaultValue={input.defaultValue}
			placeholder={input.placeholder}
			onChange={(e) => updateDraft({ path: input.path, value: e.target.value })}
			className={`${commonInputClass} min-h-[100px]`}
		/>
	);
};

export const Select = ({ input, options }: FormInputSelectProps) => {
	const updateDraft = useUpdateDraft();
	return (
		<select
			key={input.path.join("-")}
			defaultValue={input.defaultValue}
			onChange={(e) => updateDraft({ path: input.path, value: e.target.value })}
			className={commonInputClass}
		>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export const Checkbox = ({ checked, label, path }: FormInputCheckboxProps) => {
	const updateDraft = useUpdateDraft();
	return (
		<div className="flex items-center gap-2">
			<input
				key={path.join("-")}
				type="checkbox"
				defaultChecked={checked}
				onChange={(e) => updateDraft({ path: path, value: e.target.checked })}
				className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
			/>
			<label className="text-sm text-gray-700">{label}</label>
		</div>
	);
};

export const InputDate = ({ defaultValue, path }: FormInputDateProps) => {
	const updateDraft = useUpdateDraft();
	const formattedDate = defaultValue ? defaultValue.slice(0, 10) : "";
	return (
		<input
			key={path.join("-")}
			type="date"
			defaultValue={formattedDate}
			onChange={(e) => updateDraft({ path: path, value: e.target.value })}
			className={commonInputClass}
		/>
	);
};

export const InputCommaSeparated = ({ input }: InputCommaSeparatedProps) => {
	const updateDraft = useUpdateDraft();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const keywordsArray = e.target.value
			.split(",")
			.map((k) => k.trim())
			.filter(Boolean);
		updateDraft({ path: input.path, value: keywordsArray });
	};
	return (
		<input
			key={input.path.join("-")}
			type="text"
			defaultValue={input.defaultValue?.join(", ")}
			placeholder={input.placeholder}
			onChange={handleChange}
			className={commonInputClass}
		/>
	);
};
