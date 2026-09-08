"use client";

import { useTheme } from "@/utils/store";
import { Moon, Sun } from "lucide-react";
import CompanySwitcher from "./CompanySwitcher";
import { AnimatePresence, motion } from "motion/react";

function TopBar() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="bg-background p-2 h-16.25 flex gap-2 items-center justify-end">
            <CompanySwitcher />

            <button
                onClick={toggleTheme}
                className="border p-2 bg-background-secondary rounded-full border-border-clr flex items-center justify-center"
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            layout
                            key="moon"
                            initial={{ y: -2, opacity: 0, rotate: -10 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 2, opacity: 0, rotate: 10 }}
                            className="flex gap-2 items-center"
                        >
                            <Moon
                                size={18}
                                className="text-primary-text fill-border-clr"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            layout
                            key="sun"
                            initial={{ y: 2, opacity: 0, rotate: 10 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -2, opacity: 0, rotate: -10 }}
                            className="flex gap-2 items-center"
                        >
                            <Sun
                                size={18}
                                className="text-primary-text fill-border-clr"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
}

export default TopBar;
