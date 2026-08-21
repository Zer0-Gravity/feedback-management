"use client";

import { useTheme } from "@/utils/store";
import { ReactNode, useEffect } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const { isDark } = useTheme();

    //Set ui theme for dark and light
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    });

    return <>{children}</>;
}
