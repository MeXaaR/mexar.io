import { create } from 'zustand'

export type GlobalStore = {
    dark: boolean;
    setIsDark: (value: boolean) => void;
}

export const useGlobalStore = create((set) => ({
    dark: false,
    setIsDark: (value: boolean) => set(() => ({ dark: value })),
}))