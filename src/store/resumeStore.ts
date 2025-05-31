import { ResumeData } from "@/types/types";

import { create } from "zustand";

interface ResumeState {
	resumeData: ResumeData | null;
	isLoading: boolean;
	error: string | null;
	fetchResumeData: () => void;
	updateResumeData: (newData: ResumeData) => void;
	clearResumeData: () => void;
}

export const ResumeJsonStore = create<ResumeState>()((set) => ({
	resumeData: null,
	isLoading: false,
	error: null,
	fetchResumeData: () => {
		set({ isLoading: true });
		try {
			const resumeData = localStorage.getItem("generatedResumeData");
			if (!resumeData) return { error: "No resume data found" };
			set({ resumeData: JSON.parse(resumeData).resume });
		} catch (error) {
			set({ error: error as string });
		} finally {
			set({ isLoading: false });
		}
	},

	updateResumeData: (newData: ResumeData) => set({ resumeData: newData }),
	clearResumeData: () => set({ resumeData: null }),
}));
