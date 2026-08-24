import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyType {
    companyId: string | null;
    setCompany: (id: string) => void;
    setDefault: () => void;
}

interface ThemeType {
    isDark: boolean;
    isChecked: boolean;
    toggleTheme: () => void;
}

export const useCompany = create<CompanyType>()(
    persist(
        (set) => ({
            companyId: null,
            setCompany: (id) => set({ companyId: id }),
            setDefault: () => set({ companyId: null }),
        }),
        { name: "company-select" },
    ),
);

export const useTheme = create<ThemeType>()(
    persist(
        (set) => ({
            isDark: false,
            isChecked: false,
            toggleTheme: () =>
                set((state) => ({
                    isDark: !state.isDark,
                    isChecked: !state.isChecked,
                })),
        }),
        {
            name: "theme-app",
        },
    ),
);
