import { create } from "zustand";

export interface ISignInBaseStore {
    modal: {
        isOpen: boolean;
    }
}

export interface ISignInStore extends ISignInBaseStore {
    updateValue: <K extends keyof ISignInBaseStore>(key: K, value: ISignInBaseStore[K]) => void;
}

export const useSignInStore = create<ISignInStore>(
    (set) => ({
        modal: {
            isOpen: false
        },
        updateValue: (key, value) => set({ [key]: value })
    })
)