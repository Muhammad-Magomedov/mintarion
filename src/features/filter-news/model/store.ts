import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INewsFilters } from "@/entities/news";

export interface INewsFilterStore extends INewsFilters {
  filters: INewsFilters
  updateFilter: <K extends keyof INewsFilters>(
    key: K,
    value: INewsFilters[K]
  ) => void;
  clearFilters: () => void
  setFilters: (filters: INewsFilters) => void
}

export const useNewsFilterStore = create<INewsFilterStore>()(
  persist(
    (set) => ({
      filters: {
        search: "",
        source: "All",
        category: "All",
      },
      updateFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value }
      })),
      clearFilters: () => set({ filters: {} }),
      setFilters: (filters) => set({ filters })
    }),
    {
      name: "mintarion-news-filter",
    }
  )
);
