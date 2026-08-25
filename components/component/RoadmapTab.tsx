"use client";

import { Post, User } from "@/app/generated/prisma/client";
import { CATEGORY_CONFIG } from "@/utils/func";
import { formatDistanceToNow } from "date-fns";
import { Dot } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Database = Post & {
    user: User;
};

function RoadmapTab({ database }: { database: Database[] }) {
    const [currentTab, setCurrentTab] = useState<string>("Backlog");
    const tabs = ["Backlog", "Accepted", "Progress", "Review", "Completed"];
    return (
        <div className="flex flex-col gap-2 h-dvh">
            <div className="flex gap-3 items-center w-full sm:w-fit justify-between md:justify-normal bg-background p-2 rounded-lg">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentTab(tab)}
                        className="relative p-1 rounded-lg cursor-pointer"
                    >
                        <span
                            className={`text-[12px] md:text-[14pxx] text-secondary-text transition-all relative z-10 ${currentTab === tab ? "text-white" : ""}`}
                        >
                            {tab}
                        </span>

                        {currentTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                transition={{
                                    type: "spring",
                                    damping: 30,
                                    stiffness: 300,
                                }}
                                className="absolute inset-0 bg-button-clr rounded-lg"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="flex-1 flex flex-col min-h-0">
                {currentTab === "Backlog" && (
                    <TabPanel
                        database={database}
                        status="Backlog"
                        label="Backlog"
                    />
                )}

                {currentTab === "Accepted" && (
                    <TabPanel
                        database={database}
                        status="Accepted"
                        label="Accepted"
                    />
                )}

                {currentTab === "Progress" && (
                    <TabPanel
                        database={database}
                        status="In_Progress"
                        label="In Progress"
                    />
                )}

                {currentTab === "Review" && (
                    <TabPanel
                        database={database}
                        status="Review"
                        label="Review"
                    />
                )}

                {currentTab === "Completed" && (
                    <TabPanel
                        database={database}
                        status="Completed"
                        label="Completed"
                    />
                )}
            </div>
        </div>
    );
}

function TabPanel({
    database,
    status,
    label,
}: {
    database: Database[];
    status: string;
    label: string;
}) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                layoutId="tabs"
                initial={{ y: 2, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-2 h-full flex flex-col"
            >
                <p className="text-[14px] text-primary-text font-medium">
                    {label}
                </p>

                <div className="border-2 border-border-clr rounded-md flex-1 p-2 flex gap-2 flex-col overflow-y-auto hide-scrollbar">
                    {database.length !== 0 ? (
                        database
                            .filter((db) => db.status === status)
                            .map((post) => {
                                const category =
                                    CATEGORY_CONFIG[
                                        post.category.toLowerCase()
                                    ];

                                return (
                                    <div
                                        key={post.id}
                                        className="bg-card-clr p-2 rounded-lg space-y-2"
                                    >
                                        <div className="flex gap-2 items-center">
                                            <h1 className="text-primary-text text-[14px] font-semibold">
                                                {post.title}
                                            </h1>
                                            <p
                                                style={{
                                                    color: `${category.color}`,
                                                }}
                                                className="text-[10px]"
                                            >
                                                {category.label}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <p className="text-secondary-text text-[12px]">
                                                {`Submitted by ${post.user.name ?? "Unknown"}`}
                                            </p>
                                            <Dot
                                                size={14}
                                                className="text-secondary-text"
                                            />
                                            <p className="text-secondary-text text-[12px]">
                                                {formatDistanceToNow(
                                                    post.created_at,
                                                    {
                                                        addSuffix: true,
                                                    },
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <div>No submission yet</div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default RoadmapTab;
