import { create } from "zustand";

type User = {
  id: string | null;
  email: string | null;
  displayName: string | null;

  setUser: (user: {
    id?: string | null;
    email?: string | null;
    displayName?: string | null;
  }) => void;

  clearUser: () => void;
};

export const useUserStore = create<User>((set) => ({
  id: null,
  email: null,
  displayName: null,

  setUser: ({ id, email, displayName }) =>
    set((state) => ({
      id: id ?? state.id,
      email: email ?? state.email,
      displayName: displayName ?? state.displayName,
    })),

  clearUser: () =>
    set({
      id: null,
      email: null,
      displayName: null,
    }),
}));

