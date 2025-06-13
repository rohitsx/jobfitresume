import { ProjectFormProps } from "@/types/Form.types";
import {
	CellContainer,
	Checkbox,
	FormField,
	InputCommaSeparated,
	InputDate,
	InputText,
	TextArea,
	Select,
} from "./help/formComponents";

export const ProjectForm = ({ project, index }: ProjectFormProps) => {
	const path = ["projects", index];
	return (
		<CellContainer>
			<FormField label="Project Title" fullWidth>
				<InputText
					input={{ defaultValue: project.title, path: [...path, "title"] }}
				/>
			</FormField>
			<FormField label="Project Type">
				<Select
					input={{ defaultValue: project.type, path: [...path, "type"] }}
					options={["Personal", "Academic", "Freelance", "Hackathon"]}
				/>
			</FormField>
			<div className="flex items-end gap-4">
				<FormField label="Start Date">
					<InputDate
						defaultValue={project.startDate}
						path={[...path, "startDate"]}
					/>
				</FormField>
				{!project.current && (
					<FormField label="End Date">
						<InputDate
							defaultValue={project.endDate}
							path={[...path, "endDate"]}
						/>
					</FormField>
				)}
			</div>
			<Checkbox
				label="This is an ongoing project"
				checked={project.current}
				path={[...path, "current"]}
			/>
			<FormField label="Description" fullWidth>
				<TextArea
					input={{
						// @ts-ignore
						defaultValue: project.description,
						path: [...path, "description"],
					}}
				/>
			</FormField>
			<FormField label="Technologies (comma-separated)" fullWidth>
				<InputCommaSeparated
					input={{
						defaultValue: project.technologies,
						path: [...path, "technologies"],
						placeholder: "e.g., React, Node.js, PostgreSQL",
					}}
				/>
			</FormField>
		</CellContainer>
	);
};
