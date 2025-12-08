import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ICopilot } from "./types";

export interface ICopilotStore extends ICopilot {
    updateValue: <K extends keyof ICopilot>(key: K, value: ICopilot[K]) => void;
}

export const useCopilotStore = create<ICopilotStore>()(
    persist(
        (set, get) => ({
            chat: {
                isOpen: false,
                userMessage: "",
            },
            updateValue: (key, value) => set({ [key]: value })
        }),
        {
            name: "copilot-store"
        }
    )
)