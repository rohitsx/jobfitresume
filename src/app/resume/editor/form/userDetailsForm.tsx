import { UserDetails } from "@/types/ResumeData.types";
import {
	FormField,
	InputText,
	Select,
	TextArea,
	CellContainer,
} from "./help/formComponents";

interface UserDetailsFormProps {
	userDetails: UserDetails;
}

export const UserDetailsForm = ({ userDetails }: UserDetailsFormProps) => {
	const path = ["userDetails"];

	return (
		<CellContainer>
			<FormField label="Full Name">
				<InputText
					input={{ defaultValue: userDetails.name, path: [...path, "name"] }}
				/>
			</FormField>
			<FormField label="Current Title">
				<InputText
					input={{
						defaultValue: userDetails.currentTitle,
						path: [...path, "currentTitle"],
					}}
				/>
			</FormField>
			<FormField label="Email">
				<InputText
					input={{ defaultValue: userDetails.email, path: [...path, "email"] }}
				/>
			</FormField>
			<FormField label="Country">
				<InputText
					input={{
						defaultValue: userDetails.country,
						path: [...path, "country"],
					}}
				/>
			</FormField>
			<FormField label="Work Preference">
				<Select
					input={{
						defaultValue: userDetails.workPreference,
						path: [...path, "workPreference"],
					}}
					options={["Remote", "Hybrid", "On-site"]}
				/>
			</FormField>
			<FormField label="GitHub Profile">
				<InputText
					input={{
						defaultValue: userDetails.github,
						path: [...path, "github"],
					}}
				/>
			</FormField>
			<FormField label="LinkedIn Profile">
				<InputText
					input={{
						defaultValue: userDetails.linkedin,
						path: [...path, "linkedin"],
					}}
				/>
			</FormField>
			<FormField label="Personal Website">
				<InputText
					input={{
						defaultValue: userDetails.website,
						path: [...path, "website"],
					}}
				/>
			</FormField>
			<FormField label="Summary" fullWidth>
				<TextArea
					input={{
						defaultValue: userDetails.summary,
						placeholder: "A brief professional summary...",
						path: [...path, "summary"],
					}}
				/>
			</FormField>
		</CellContainer>
	);
};
