import { create } from "zustand";

export interface ISignUpBaseStore {
    modal: {
        isOpen: boolean;
    }
}

export interface ISignUpStore extends ISignUpBaseStore {
    updateValue: <K extends keyof ISignUpBaseStore>(key: K, value: ISignUpBaseStore[K]) => void;
}

export const useSignUpStore = create<ISignUpStore>(
    (set) => ({
        modal: {
            isOpen: false
        },
        updateValue: (key, value) => set({ [key]: value })
    })
)