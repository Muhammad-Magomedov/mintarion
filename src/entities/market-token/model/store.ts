import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IMarketToken } from "./types";

export interface IMarketTokensStore {
  data: Record<string, IMarketToken>;
  updateData: (key: string, value: IMarketToken) => void;
  setData: (data: Record<string, IMarketToken>) => void;
  mergeData: (data: Record<string, IMarketToken>) => void;
  clearData: () => void;
}

export const useMarketTokensStore = create<IMarketTokensStore>()(
  persist(
    (set, get) => ({
      data: {},
      updateData: (key, value) =>
        set({ data: { ...get().data, [key]: value } }),
      setData: (data) => set({ data }),
      mergeData: (data) => {
        const currentData = get().data;
        const mergedData = { ...currentData };

        Object.entries(data).forEach(([key, value]) => {
          mergedData[key] = {
            ...value,
            isLiked: currentData[key]?.isLiked ?? false,
          };
        });

        set({ data: mergedData });
      },
      clearData: () => set({ data: {} }),
    }),
    {
      name: "market-tokens-store",
    }
  )
);
