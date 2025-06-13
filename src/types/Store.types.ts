import { ResumeData } from "./ResumeData.types";

export interface ResumeDataPayload {
	path: (string | number)[];
	value: any;
}

export interface ResumeStore {
	resumeData: ResumeData | undefined;
	draftData: ResumeData | null;
	uid: string | undefined;

	setResumeData: (data: ResumeData) => void;
	setUid: (uid: string) => void;
	clearResumeData: () => void;

	startEditing: () => void;
	discardChanges: () => void;
	saveChanges: () => void;

	updateDraftData: (payload: ResumeDataPayload) => void;
	addWorkExperience: () => void;
	removeWorkExperience: (index: number) => void;
	addEducation: () => void;
	removeEducation: (index: number) => void;
	addProject: () => void;
	removeProject: (index: number) => void;
}
