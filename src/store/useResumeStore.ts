import { ResumeData } from "@/types/types";
import { create } from "zustand";

interface ResumeStore {
  resumeData: ResumeData | undefined;
  uid: string | undefined;
  setResumeData: (data: ResumeData) => void;
  setUid: (uid: string) => void;
  clearResumeData: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: undefined,
  uid: undefined,
  setResumeData: (data: ResumeData) => set({ resumeData: data }),
  setUid: (uid: string) => set({ uid }),
  clearResumeData: () => set({ resumeData: undefined }),
}));
