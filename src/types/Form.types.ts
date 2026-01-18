import { ReactNode } from "react";
import {
	WorkExperience,
	Education,
	Project,
	Skill,
	UserDetails,
} from "./ResumeData.types";

export interface FormInputProps<T> {
	input: {
		defaultValue?: T;
		placeholder?: string;
		path: (string | number)[];
	};
}

export interface FormInputTextProps extends FormInputProps<string> { }
export interface InputCommaSeparatedProps extends FormInputProps<string[]> { }
export interface FormInputSelectProps extends FormInputProps<string> {
	options: string[];
}
export interface FormInputDateProps {
	defaultValue?: string;
	path: (string | number)[];
}
export interface FormInputCheckboxProps {
	checked: boolean;
	label: string;
	path: (string | number)[];
}

export interface HeadingDivProps {
	heading: string;
	children: ReactNode;
}
export interface FormFieldProps {
	label: string;
	children: ReactNode;
	fullWidth?: boolean;
}

export interface UserDetailsFormProps {
	userDetails: UserDetails;
}
export interface ExperienceFormProps {
	experience: WorkExperience;
	index: number;
}
export interface EducationFormProps {
	education: Education;
	index: number;
}
export interface ProjectFormProps {
	project: Project;
	index: number;
}
export interface SkillsFormProps {
	skills: Skill[];
}
