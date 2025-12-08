import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IBaseStore } from "@/shared/types/store";

export interface IShowUserAchievementsState {
  isCardVisible: boolean;
  progress: number;
  achievements: {
    isProfileLinkShared: boolean;
    hasMinReadersCount: boolean;
    isFirstArticlePublished: boolean;
    isProfileCompleted: boolean;
  };
}

export interface IShowUserAchievementsStore
  extends IShowUserAchievementsState,
    IBaseStore<IShowUserAchievementsState> {}

export const useShowUserAchievementsStore =
  create<IShowUserAchievementsStore>()(
    persist(
      (set, get) => ({
        isCardVisible: true,
        achievements: {
          isProfileLinkShared: false,
          hasMinReadersCount: false,
          isFirstArticlePublished: true,
          isProfileCompleted: true,
        },
        progress: 0,

        updateValue: (key, value) => {
          set({ [key]: value });
          if (key === "achievements") {
            const state = get();
            const progress = calculateProgress(state);
            set({ progress });
          }
        },
      }),
      {
        name: "show-user-achievements-store",
        partialize: (state) => ({
          achievements: state.achievements,
          progress: state.progress,
        }),
      }
    )
  );

export function calculateProgress(state: IShowUserAchievementsState) {
  if (!state) return 0;

  const values = Object.values(state.achievements);
  const trueCount = values.filter(Boolean).length;
  return Math.round((trueCount / values.length) * 100);
}