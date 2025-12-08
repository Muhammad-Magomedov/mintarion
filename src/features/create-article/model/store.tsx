import { create } from "zustand";
import { IBaseStore } from "@/shared/types/store";

export interface ICreateArticleState {
    isNewArticlePublished: boolean;
}

export interface ICreateArticleStore extends ICreateArticleState, IBaseStore<ICreateArticleState> {}

export const useCreateArticleStore = create<ICreateArticleStore>((set) => ({
    isNewArticlePublished: true,
    updateValue: (key, value) => set({ [key]: value })
}))