import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],
  setUser: (user) => set({ user }),
}));

export default useUserStore;
