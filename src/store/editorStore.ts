import { create } from "zustand";
import {
	ResumeData,
	UserDetails,
	WorkExperience,
	Education,
	Project,
	Skill,
	EditableData,
} from "@/types/types";
import { getDatabase, ref, update, get } from "firebase/database";
import { FirebaseApp } from "@/lib/firebase"; // Ensure FirebaseApp is correctly initialized and exported
import { getDbRef } from "@/lib/dbRef"; // Ensure this correctly gets the user-specific ref `users/${uid}`

// Helper function to get UID
const getUid = (): string | null => {
	if (typeof window !== "undefined") {
		return localStorage.getItem("uid");
	}
	return null;
};

// Default empty structures for adding new items
const defaultWorkExperience: WorkExperience = {
	jobTitle: "",
	companyName: "",
	WorkStyle: "Full-time",
	startDate: "",
	current: false,
	description: "",
	technologies: [],
	achievements: ["", "", "", ""],
	location: "",
	roleLevel: undefined,
};
const defaultEducation: Education = {
	degree: "",
	major: "",
	university: "",
	completed: false,
	keyLearnings: [],
	location: "",
	startDate: "",
	endDate: "",
	graduationDate: "",
	institutionType: undefined,
	gpa: null,
};
const defaultProject: Project = {
	title: "New Project",
	type: "Personal",
	startDate: "",
	endDate: "",
	role: "",
	teamSize: 1,
	description: "",
	outcome: "",
	technologies: [],
	repoLink: "",
	liveDemoLink: "",
	keyLearnings: [],
	achievements: ["", "", "", ""],
};
const defaultSkill: Skill = {
	name: "",
	category: "Technical",
	proficiency: "Beginner",
	yearsOfExperience: 0,
};

export type EditorTabKey =
	| "userDetails"
	| "workExperience"
	| "education"
	| "projects"
	| "skills";

interface EditorState {
	resumeData: ResumeData | null;
	initialResumeDataLoaded: boolean;
	activeTab: EditorTabKey;
	isEditing: boolean;
	editData: EditableData | null;
	isSaving: boolean;
	error: string | null;
	hasResumeDataOnPageLoad: boolean | null; // For app/resume/page.tsx to know if data exists

	// Actions
	initializeEditor: () => Promise<void>;
	setResumeDataAfterUpload: (data: ResumeData) => void; // Specifically for PDFUploader
	setActiveTab: (tab: EditorTabKey) => void;
	startEditing: () => void;
	cancelEditing: () => void;
	saveChanges: () => Promise<void>;
	updateUserDetailsField: (
		field: keyof UserDetails,
		value: string | undefined,
	) => void;
	updateListItemField: <T extends WorkExperience | Education | Project | Skill>(
		section: "workExperience" | "education" | "projects" | "skills",
		index: number,
		field: keyof T,
		value: T[keyof T],
	) => void;
	addListItem: (
		section: "workExperience" | "education" | "projects" | "skills",
	) => void;
	deleteListItem: (
		section: "workExperience" | "education" | "projects" | "skills",
		index: number,
	) => void;
	setHasResumeDataStatus: (status: boolean) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
	resumeData: null,
	initialResumeDataLoaded: false,
	activeTab: "userDetails",
	isEditing: false,
	editData: null,
	isSaving: false,
	error: null,
	hasResumeDataOnPageLoad: null,

	setHasResumeDataStatus: (status: boolean) =>
		set({ hasResumeDataOnPageLoad: status }),

	initializeEditor: async () => {
		const uid = getUid();
		if (!uid) {
			set({
				error: "User not authenticated.",
				initialResumeDataLoaded: true,
				hasResumeDataOnPageLoad: false,
			});
			return;
		}
		// Prevent re-fetching if already loaded and not forced
		if (get().initialResumeDataLoaded && get().resumeData) {
			return;
		}

		set({ isSaving: true, error: null }); // Use isSaving as loading indicator for fetch

		try {
			const userNodeRef = getDbRef(); // This points to users/${uid}
			if (!userNodeRef) {
				set({
					error: "Database reference not found.",
					isSaving: false,
					initialResumeDataLoaded: true,
					hasResumeDataOnPageLoad: false,
				});
				return;
			}
			const snapshot = get(userNodeRef);
			if (snapshot.exists()) {
				const userData = snapshot.val();
				if (userData && userData.resumeData) {
					set({
						resumeData: userData.resumeData,
						error: null,
						hasResumeDataOnPageLoad: true,
					});
				} else {
					const emptyResume: ResumeData = {
						userDetails: {} as UserDetails,
						workExperience: [],
						education: [],
						projects: [],
						skills: [],
					};
					set({
						resumeData: emptyResume,
						error: null,
						hasResumeDataOnPageLoad: false,
					});
				}
			} else {
				const emptyResume: ResumeData = {
					userDetails: {} as UserDetails,
					workExperience: [],
					education: [],
					projects: [],
					skills: [],
				};
				set({
					resumeData: emptyResume,
					error: "No data found for user.",
					hasResumeDataOnPageLoad: false,
				});
			}
		} catch (err: any) {
			console.error("Error fetching resume data:", err);
			set({
				error: "Failed to load resume data: " + err.message,
				hasResumeDataOnPageLoad: false,
			});
		} finally {
			set({ isSaving: false, initialResumeDataLoaded: true });
		}
	},

	setResumeDataAfterUpload: (data: ResumeData) => {
		set({
			resumeData: data,
			hasResumeDataOnPageLoad: true,
			initialResumeDataLoaded: true,
			error: null,
		});
	},

	setActiveTab: (tab) => {
		if (get().isEditing) {
			// console.warn('Cancelling edit due to tab change. Implement confirm dialog if needed.');
			get().cancelEditing();
		}
		set({ activeTab: tab, isEditing: false, editData: null });
	},

	startEditing: () => {
		const { resumeData, activeTab } = get();
		if (!resumeData) return;

		let dataToEdit: EditableData | null = null;
		if (activeTab === "userDetails") {
			dataToEdit = resumeData.userDetails
				? { ...resumeData.userDetails }
				: ({} as UserDetails);
		} else if (
			["workExperience", "education", "projects", "skills"].includes(activeTab)
		) {
			const sectionData =
				resumeData[activeTab as keyof Omit<ResumeData, "userDetails">];
			dataToEdit = sectionData ? JSON.parse(JSON.stringify(sectionData)) : [];
		}
		set({ isEditing: true, editData: dataToEdit, error: null });
	},

	cancelEditing: () => {
		set({ isEditing: false, editData: null, error: null });
	},

	saveChanges: async () => {
		const { editData, activeTab, resumeData: currentResumeData } = get();
		const uid = getUid();

		if (!editData || !currentResumeData || !uid) {
			set({ error: "Cannot save: Missing data or user ID." });
			return;
		}
		set({ isSaving: true, error: null });

		// Create a deep copy to avoid direct mutation if resumeData is used elsewhere reactively
		let updatedFullResumeData: ResumeData = JSON.parse(
			JSON.stringify(currentResumeData),
		);

		if (activeTab === "userDetails") {
			updatedFullResumeData.userDetails = editData as UserDetails;
		} else if (
			["workExperience", "education", "projects", "skills"].includes(activeTab)
		) {
			const sectionKey = activeTab as
				| "workExperience"
				| "education"
				| "projects"
				| "skills";
			updatedFullResumeData[sectionKey] = editData as any[];
		} else {
			set({ isSaving: false, error: "Invalid active tab for saving." });
			return;
		}

		try {
			const db = getDatabase(FirebaseApp);
			const userResumeDataPathRef = ref(db, `users/${uid}/resumeData`);
			await update(userResumeDataPathRef, updatedFullResumeData);

			set({
				resumeData: updatedFullResumeData, // Update store with successfully saved data
				isEditing: false,
				editData: null,
				isSaving: false,
				error: null,
				hasResumeDataOnPageLoad: true,
			});
		} catch (err: any) {
			console.error("Error saving data:", err);
			set({ isSaving: false, error: "Failed to save changes: " + err.message });
		}
	},

	updateUserDetailsField: (field, value) => {
		set((state) => {
			if (
				state.activeTab === "userDetails" &&
				state.editData &&
				!Array.isArray(state.editData)
			) {
				return {
					editData: { ...(state.editData as UserDetails), [field]: value },
				};
			}
			return {};
		});
	},

	updateListItemField: (section, index, field, value) => {
		set((state) => {
			if (
				state.activeTab === section &&
				state.editData &&
				Array.isArray(state.editData)
			) {
				const newList = [...state.editData]; // Shallow copy of the array
				if (newList[index]) {
					// Shallow copy of the item being modified
					newList[index] = { ...newList[index], [field]: value };
					return { editData: newList as EditableData };
				}
			}
			return {};
		});
	},

	addListItem: (section) => {
		set((state) => {
			if (state.activeTab !== section) return {}; // Ensure we're adding to the active section

			let newItem;
			switch (section) {
				case "workExperience":
					newItem = { ...defaultWorkExperience };
					break;
				case "education":
					newItem = { ...defaultEducation };
					break;
				case "projects":
					newItem = { ...defaultProject };
					break;
				case "skills":
					newItem = { ...defaultSkill };
					break;
				default:
					return {};
			}

			const currentEditData = state.editData;
			if (Array.isArray(currentEditData)) {
				return { editData: [...currentEditData, newItem] as EditableData };
			} else if (currentEditData === null || currentEditData === undefined) {
				// If editData for this array section was initially null/undefined
				return { editData: [newItem] as EditableData };
			}
			return {};
		});
	},

	deleteListItem: (section, index) => {
		set((state) => {
			if (
				state.activeTab === section &&
				state.editData &&
				Array.isArray(state.editData)
			) {
				const newList = (state.editData as any[]).filter((_, i) => i !== index);
				return { editData: newList as EditableData };
			}
			return {};
		});
	},
}));
