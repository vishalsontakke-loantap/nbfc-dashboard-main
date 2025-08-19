import { create } from "zustand";

export const useTabStore = create<TabStore>((set) => ({
  submittedTabs: [],
  markTabAsSubmitted: (tab) =>
    set((state) => ({
      submittedTabs: [...state.submittedTabs, tab],
    })),
}));
