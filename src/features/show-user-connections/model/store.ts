import { create } from "zustand";

export interface IShowConnectionsState {
  userId: string;
  modal: {
    isOpen: boolean;
  };
  activeTab: "followers" | "following";
}

export interface IShowConnectionsStore extends IShowConnectionsState {
  updateValue: <K extends keyof IShowConnectionsState>(
    key: K,
    value: IShowConnectionsState[K]
  ) => void;
}

export const useShowConnectionsStore = create<IShowConnectionsStore>((set) => ({
  userId: "",
  modal: {
    isOpen: false,
  },
  activeTab: "followers",
  updateValue: (key, value) => set({ [key]: value }),
}));
