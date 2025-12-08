import { create } from "zustand";
import type { IBaseStore } from "@/shared/types/store";

export interface IShowErrorModalState {
  isOpen: boolean;
}

export interface IShowErrorModalStore
  extends IShowErrorModalState,
    IBaseStore<IShowErrorModalState> {}

export const useShowErrorModalStore = create<IShowErrorModalStore>((set) => ({
  isOpen: false,
  updateValue: (key, value) => set({ [key]: value }),
}));
