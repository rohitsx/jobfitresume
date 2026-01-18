import { create } from "zustand";

type StoreType = {
  hash: string;
  setHash: (hash: string) => void;
  initializeHash: () => void;
};

export const useHashStore = create<StoreType>((set) => ({
  hash: "",
  setHash: (newHash: string) => {
    set({ hash: newHash });
    if (typeof window !== "undefined") {
      window.location.hash = newHash;
    }
  },
  initializeHash: () => {
    if (typeof window !== "undefined") {
      set({ hash: window.location.hash });
    }
  },
}));
