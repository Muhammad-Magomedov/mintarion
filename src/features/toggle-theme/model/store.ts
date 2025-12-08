import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ThemeType } from "./types";

export interface IThemeStore {
    theme: ThemeType
    setTheme: (theme: ThemeType) => void
}

export const useThemeStore = create<IThemeStore>()(
    persist(
        (set) => ({
            theme: "dark",
            setTheme: (theme) => set({ theme })
        }),
        {
            name: "mintarion-theme",
        }
    )
)