import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IMarketOverviewFilterSettings } from "./types";

export interface IMarketOverviewFilterSettingsStore {
    settings: IMarketOverviewFilterSettings;
    updateSettings: <K extends keyof IMarketOverviewFilterSettings>(key: K, value: IMarketOverviewFilterSettings[K]) => void;
    setSettings: (settings: IMarketOverviewFilterSettings) => void;
}

export const useMarketOverviewFilterSettingsStore = create<IMarketOverviewFilterSettingsStore>()(
    persist(
        (set, get) => ({
            settings: {
                favoritesOnly: false,
                exchange: "All",
                mode: "auto",
                showNews: true,
                newsType: "all"
            },
            updateSettings: (key, value) => set({ settings: { ...get().settings, [key]: value } }),
            setSettings: (settings) => set({ settings })
        }),
        {
            name: "market-overview-filter-settings-store"
        }
    )
)