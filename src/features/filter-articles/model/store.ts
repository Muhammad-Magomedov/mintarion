import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IArticlesFilters } from "@/entities/article";

export interface IArticlesFilterStore extends IArticlesFilters {
  filters: IArticlesFilters
  updateFilter: <K extends keyof IArticlesFilters>(
    key: K,
    value: IArticlesFilters[K]
  ) => void;
  clearFilters: () => void
  setFilters: (filters: IArticlesFilters) => void
}

export const useArticlesFilterStore = create<IArticlesFilterStore>()(
  persist(
    (set) => ({
      filters: {
        search: "",
        sortBy: "Relevance",
        category: "All",
      },
      updateFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value }
      })),
      clearFilters: () => set({ filters: {} }),
      setFilters: (filters) => set({ filters })
    }),
    {
      name: "mintarion-articles-filter",
    }
  )
);
