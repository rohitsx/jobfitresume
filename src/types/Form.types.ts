import { ReactNode } from "react";
import {
	WorkExperience,
	Education,
	Project,
	Skill,
	UserDetails,
} from "./ResumeData.types";

// --- Generic and Reusable Component Props ---

/**
 * Generic props for a form input component.
 * @template T The type of the input's value (e.g., string, string[], boolean).
 */
export interface FormInputProps<T> {
	input: {
		defaultValue?: T;
		placeholder?: string;
		path: (string | number)[]; // Path to the value in the Zustand store
	};
}

// Specific input types extending the generic one
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

// --- Wrapper and Layout Component Props ---

export interface HeadingDivProps {
	heading: string;
	children: ReactNode;
}

export interface FormFieldProps {
	label: string;
	children: ReactNode;
	fullWidth?: boolean;
}

// --- Section-Specific Form Props ---

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

// Note: The UserDetailFormProps from the original prompt is no longer needed
// because the new UserDetailsForm component takes the entire `userDetails` object
// for a more robust and less repetitive implementation.
export interface UserDetailsFormProps {
	userDetails: UserDetails;
}
