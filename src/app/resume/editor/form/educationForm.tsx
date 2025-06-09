import { EducationFormProps } from "@/types/Form.types";
import {
	CellContainer,
	FormField,
	InputDate,
	InputText,
	Checkbox,
	Select,
} from "./help/formComponents";

export const EducationForm = ({ education, index }: EducationFormProps) => {
	const path = ["education", index];

	return (
		<CellContainer>
			<FormField label="University / Institution">
				<InputText
					input={{
						defaultValue: education.university,
						path: [...path, "university"],
					}}
				/>
			</FormField>
			<FormField label="Degree">
				<InputText
					input={{ defaultValue: education.degree, path: [...path, "degree"] }}
				/>
			</FormField>
			<FormField label="Major">
				<InputText
					input={{ defaultValue: education.major, path: [...path, "major"] }}
				/>
			</FormField>
			<FormField label="Institution Type">
				<Select
					input={{
						defaultValue: education.institutionType,
						path: [...path, "institutionType"],
					}}
					options={[
						"University",
						"College",
						"Bootcamp",
						"Online Course",
						"Certification Program",
					]}
				/>
			</FormField>
			<FormField label="Start Date">
				<InputDate
					defaultValue={education.startDate}
					path={[...path, "startDate"]}
				/>
			</FormField>
			<FormField label="End Date / Graduation Date">
				<InputDate
					defaultValue={education.endDate || education.graduationDate}
					path={[...path, "endDate"]}
				/>
			</FormField>
			<FormField label="GPA">
				<InputText
					input={{ defaultValue: education.gpa ?? "", path: [...path, "gpa"] }}
				/>
			</FormField>
			<Checkbox
				label="Completed"
				checked={education.completed}
				path={[...path, "completed"]}
			/>
		</CellContainer>
	);
};
