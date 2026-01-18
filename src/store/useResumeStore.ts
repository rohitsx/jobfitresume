import { create } from "zustand";
import { produce } from "immer";
import { ResumeStore } from "@/types/Store.types";
import { WorkExperience, Education, Project } from "@/types/ResumeData.types";

const defaultWorkExperience: WorkExperience = {
	companyName: "",
	jobTitle: "",
	location: "",
	workStyle: "Full-time" as const,
	startDate: new Date().toISOString().slice(0, 10),
	current: false,
	description: "",
	roleLevel: "Junior" as const,
};
const defaultEducation: Education = {
	degree: "",
	major: "",
	university: "",
	completed: false,
	institutionType: "University" as const,
	startDate: new Date().toISOString().slice(0, 10),
};
const defaultProject: Project = {
	title: "",
	startDate: new Date().toISOString().slice(0, 10),
	current: false,
	type: "Personal" as const,
};

const ensureDraftExists = (state: ResumeStore) => {
	if (!state.draftData && state.resumeData) {
		state.draftData = JSON.parse(JSON.stringify(state.resumeData));
	}
};

export const useResumeStore = create<ResumeStore>((set) => ({
	resumeData: undefined,
	draftData: null,
	uid: undefined,

	setResumeData: (data) => set({ resumeData: data, draftData: null }),
	setUid: (uid) => set({ uid }),
	clearResumeData: () =>
		set({ resumeData: undefined, draftData: null, uid: undefined }),
	startEditing: () =>
		set((state) => {
			if (!state.draftData && state.resumeData) {
				return { draftData: JSON.parse(JSON.stringify(state.resumeData)) };
			}
			return {};
		}),

	discardChanges: () =>
		set((state) => {
			if (state.resumeData) {
				return { draftData: JSON.parse(JSON.stringify(state.resumeData)) };
			}
			return { draftData: null };
		}),

	saveChanges: () =>
		set((state) => {
			if (state.draftData) {
				return { resumeData: state.draftData, draftData: null }; // Go back to "viewing" mode after save
			}
			return {};
		}),

	updateDraftData: ({ path, value }) => {
		set(
			produce((state: ResumeStore) => {
				ensureDraftExists(state);

				if (state.draftData) {
					let current: any = state.draftData;

					for (let i = 0; i < path.length - 1; i++) {
						const key = path[i];
						const nextKey = path[i + 1];
						const isNextArrayIndex = typeof nextKey === "number";

						if (current[key] === undefined) {
							current[key] = isNextArrayIndex ? [] : {};
						}
						current = current[key];
					}

					current[path[path.length - 1]] = value;
				}
			}),
		);
	},

	addWorkExperience: () =>
		set(
			produce((state: ResumeStore) => {
				ensureDraftExists(state);
				state.draftData?.workExperience.push(defaultWorkExperience);
			}),
		),

	removeWorkExperience: (index) =>
		set(
			produce((state: ResumeStore) => {
				ensureDraftExists(state);
				state.draftData?.workExperience.splice(index, 1);
			}),
		),

	addEducation: () =>
		set(
			produce((state: ResumeStore) => {
				ensureDraftExists(state);
				state.draftData?.education.push(defaultEducation);
			}),
		),

	removeEducation: (index) =>
		set(
			produce((state: ResumeStore) => {
				ensureDraftExists(state);
				state.draftData?.education.splice(index, 1);
			}),
		),

	addProject: () =>
		set(
			produce((state: ResumeStore) => {
				ensureDraftExists(state);
				if (state.draftData) {
					if (!state.draftData.projects) {
						state.draftData.projects = [];
					}
					state.draftData.projects.push(defaultProject);
				}
			}),
		),

	removeProject: (index) =>
		set(
			produce((state: ResumeStore) => {
				ensureDraftExists(state);
				state.draftData?.projects.splice(index, 1);
			}),
		),
}));
