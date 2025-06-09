import { create } from "zustand";
import { produce } from "immer";
import { ResumeDataPayload, ResumeStore } from "@/types/Store.types";
import { ResumeData } from "@/types/ResumeData.types";

// Default objects for new entries, ensuring they satisfy their types.
const defaultWorkExperience = {
	companyName: "",
	jobTitle: "",
	location: "",
	workStyle: "Full-time" as const,
	startDate: new Date().toISOString().slice(0, 10),
	current: false,
	description: "",
	roleLevel: "Junior" as const,
};

const defaultEducation = {
	degree: "",
	major: "",
	university: "",
	completed: false,
	institutionType: "University" as const,
	startDate: new Date().toISOString().slice(0, 10),
};

const defaultProject = {
	title: "",
	startDate: new Date().toISOString().slice(0, 10),
	current: false,
	type: "Personal" as const,
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
	resumeData: undefined,
	uid: undefined,

	setResumeData: (data: ResumeData) => set({ resumeData: data }),

	setUid: (uid: string) => set({ uid }),

	clearResumeData: () => set({ resumeData: undefined, uid: undefined }),

	updateResumeData: ({ path, value }: ResumeDataPayload) => {
		set(
			produce((state: ResumeStore) => {
				if (state.resumeData) {
					let current: any = state.resumeData;
					// Traverse the path to the second-to-last element
					for (let i = 0; i < path.length - 1; i++) {
						current = current[path[i]];
					}
					// Set the value on the final key
					current[path[path.length - 1]] = value;
				}
			}),
		);
	},

	// --- Type-Safe Array Actions ---

	addWorkExperience: () =>
		set(
			produce((state: ResumeStore) => {
				state.resumeData?.workExperience.push(defaultWorkExperience);
			}),
		),

	removeWorkExperience: (index: number) =>
		set(
			produce((state: ResumeStore) => {
				state.resumeData?.workExperience.splice(index, 1);
			}),
		),

	addEducation: () =>
		set(
			produce((state: ResumeStore) => {
				state.resumeData?.education.push(defaultEducation);
			}),
		),

	removeEducation: (index: number) =>
		set(
			produce((state: ResumeStore) => {
				state.resumeData?.education.splice(index, 1);
			}),
		),

	addProject: () =>
		set(
			produce((state: ResumeStore) => {
				state.resumeData?.projects.push(defaultProject);
			}),
		),

	removeProject: (index: number) =>
		set(
			produce((state: ResumeStore) => {
				state.resumeData?.projects.splice(index, 1);
			}),
		),
}));
