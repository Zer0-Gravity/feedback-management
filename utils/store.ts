import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompanyType {
    companyId: string | null;
    setCompany: (id: string) => void;
}

export const useCompany = create<CompanyType>()(
    persist(
        (set) => ({
            companyId: null,
            setCompany: (id) => set({ companyId: id }),
        }),
        { name: "company-select" },
    ),
);
