import { create } from "zustand";

type StoreType = {
	error: string | null;
	setError: (err: string | null) => void;
};

export const useErrorStore = create<StoreType>((set) => ({
	error: null,
	setError: (err) => {
		set({ error: err });
		setTimeout(() => set({ error: null }), 3000);
	},
}));
