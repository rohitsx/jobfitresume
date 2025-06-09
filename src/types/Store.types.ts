import {
	Education,
	Project,
	ResumeData,
	WorkExperience,
} from "./ResumeData.types";

/**
 * Defines the structure for a generic update payload.
 * The 'path' specifies the nested location in the ResumeData object.
 * The 'value' is 'any' because this single action must be able to update
 * various types (string, boolean, string[], etc.). Type safety is enforced
 * by the components that call this action, ensuring they provide the correct
 * value type for the given path.
 */
export interface ResumeDataPayload {
	path: (string | number)[];
	value: any;
}

/**
 * Defines the complete shape of the Zustand store, including both
 * the state and all the actions that can be performed on it.
 * Every action is strictly typed to ensure predictable state mutations.
 */
export interface ResumeStore {
	resumeData: ResumeData | undefined;
	uid: string | undefined;

	// --- Actions ---
	setResumeData: (data: ResumeData) => void;
	setUid: (uid: string) => void;
	clearResumeData: () => void;
	updateResumeData: (payload: ResumeDataPayload) => void;

	// Type-safe actions for managing array entries
	addWorkExperience: () => void;
	removeWorkExperience: (index: number) => void;
	addEducation: () => void;
	removeEducation: (index: number) => void;
	addProject: () => void;
	removeProject: (index: number) => void;
}
