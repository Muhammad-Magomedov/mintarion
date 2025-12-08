import { create } from "zustand";
import { IBaseStore } from "@/shared/types/store";

export interface IEditProfileState {
  modal: {
    isOpen: boolean;
  };
}

export interface IEditProfileStore extends IEditProfileState, IBaseStore<IEditProfileState> {}

export const useEditProfileStore = create<IEditProfileStore>((set) => ({
  modal: {
    isOpen: false,
  },
  updateValue: (key, value) => set({ [key]: value }),
}));
