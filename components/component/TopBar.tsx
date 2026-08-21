"use client";

import { useTheme } from "@/utils/store";
import { Moon, Sun } from "lucide-react";
import CompanySwitcher from "./CompanySwitcher";
import { Company } from "@/app/generated/prisma/client";

function TopBar({ companyDb }: { companyDb: Company[] }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="bg-background p-2 h-16.25 flex gap-2 items-center justify-end">
            <CompanySwitcher companyDb={companyDb} />

            <button
                onClick={toggleTheme}
                className="border p-2 bg-background-secondary rounded-full border-border-clr"
            >
                {isDark ? (
                    <div className="flex gap-2 items-center">
                        <Moon
                            size={18}
                            className="text-primary-text fill-border-clr"
                        />
                    </div>
                ) : (
                    <div className="flex gap-2 items-center">
                        <Sun size={18} className="text-primary-text" />
                    </div>
                )}
            </button>
        </div>
    );
}

export default TopBar;
