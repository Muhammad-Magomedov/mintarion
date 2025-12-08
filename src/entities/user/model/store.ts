import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "./types";

export interface IUserStore extends IUser {
    updateValue: <K extends keyof IUser>(key: K, value: IUser[K]) => void;
}

export const useUserStore = create<IUserStore>()(
    persist(
        (set) => ({
            id: "",
            firstName: "",
            lastName: "",
            avatarUrl: "",
            bio: "",
            followingCount: 0,
            followersCount: 0,
            telegramUrl: "",
            twitterUrl: "",
            facebookUrl: "",
            subscriptionPlan: "LITE",
            updateValue: (key, value) => set({ [key]: value })
        }),
        {
            name: "user-store"
        }
    )
)