import { create } from "zustand";

const useVideoStore = create((set) => ({
  videos: [],
  setVideo: (video) => set({ video }),
}));

export default useVideoStore;
