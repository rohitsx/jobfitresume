import { ResumeDataPayload } from "@/types/Store.types";
import { create } from "zustand";

export const useInputStore = create<any>((set) => ({
	path: [""],
	value: "",
	setInput: ({ path, value }: ResumeDataPayload) => set({ path, value }),
}));
