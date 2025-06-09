import { ExperienceFormProps } from "@/types/Form.types";
import {
	CellContainer,
	Checkbox,
	FormField,
	InputCommaSeparated,
	InputDate,
	InputText,
	Select,
	TextArea,
} from "./help/formComponents";

export const ExperienceForm = ({ experience, index }: ExperienceFormProps) => {
	const path = ["workExperience", index];

	return (
		<CellContainer>
			<FormField label="Company Name">
				<InputText
					input={{
						defaultValue: experience.companyName,
						path: [...path, "companyName"],
					}}
				/>
			</FormField>
			<FormField label="Job Title">
				<InputText
					input={{
						defaultValue: experience.jobTitle,
						path: [...path, "jobTitle"],
					}}
				/>
			</FormField>
			<FormField label="Location">
				<InputText
					input={{
						defaultValue: experience.location,
						path: [...path, "location"],
					}}
				/>
			</FormField>
			<FormField label="Work Style">
				<Select
					input={{
						defaultValue: experience.workStyle,
						path: [...path, "workStyle"],
					}}
					options={[
						"Freelance",
						"Contract",
						"Self-employed",
						"Full-time",
						"Part-time",
						"Internship",
						"Volunteer",
					]}
				/>
			</FormField>
			<FormField label="Role Level">
				<Select
					input={{
						defaultValue: experience.roleLevel,
						path: [...path, "roleLevel"],
					}}
					options={[
						"Junior",
						"Mid-level",
						"Senior",
						"Lead",
						"Manager",
						"Founder",
						"CTO",
					]}
				/>
			</FormField>
			<div className="flex items-end gap-4">
				<FormField label="Start Date">
					<InputDate
						defaultValue={experience.startDate}
						path={[...path, "startDate"]}
					/>
				</FormField>
				{!experience.current && (
					<FormField label="End Date">
						<InputDate
							defaultValue={experience.endDate}
							path={[...path, "endDate"]}
						/>
					</FormField>
				)}
			</div>
			<Checkbox
				label="I currently work here"
				checked={experience.current}
				path={[...path, "current"]}
			/>
			<FormField label="Description" fullWidth>
				<TextArea
					input={{
						defaultValue: experience.description,
						path: [...path, "description"],
					}}
				/>
			</FormField>
			<FormField label="Keywords (comma-separated)" fullWidth>
				<InputCommaSeparated
					input={{
						defaultValue: experience.keywords,
						path: [...path, "keywords"],
						placeholder: "e.g., Agile, Scrum, Project Management",
					}}
				/>
			</FormField>
		</CellContainer>
	);
};
