import { InputStoreProp, ResumeDataPayload } from "@/types/Store.types";
import { create } from "zustand";

export const useInputStore = create<InputStoreProp>((set) => ({
	path: [""],
	value: "",
	setInput: ({ path, value }: ResumeDataPayload) => set({ path, value }),
}));
