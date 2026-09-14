"use client";

import {
    Newspaper,
    Send,
    SquareKanban,
    TableProperties,
    User,
    Users,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import TopBar from "./TopBar/TopBar";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

function AppLayout({ children }: { children: ReactNode }) {
    const navList = [
        { link: "feed", name: "Feed", icon: Newspaper },
        { link: "roadmap", name: "Roadmap", icon: SquareKanban },
        { link: "post", name: "Post", icon: Send },
        { link: "member", name: "Member", icon: Users },
        { link: "audit-post", name: "Audit Post", icon: TableProperties },
    ];

    const path = usePathname();

    //Get the current active role
    const { data: role } = authClient.useActiveMemberRole();
    if (!role) return;

    //Slice the navigation bar if the user are just a member
    const filteredList =
        role.role !== "owner" && role.role !== "admin"
            ? navList.slice(0, 4)
            : navList;

    return (
        <main className="flex md:flex-row flex-col h-screen">
            {/* | Desktop Sidebar | */}
            <aside className="w-65 p-5 hidden md:flex flex-col">
                <nav className="space-y-2 flex-1">
                    {filteredList.map((list, index) => (
                        <Link
                            key={index}
                            href={`/${list.link}`}
                            className="flex gap-2 items-center p-1.5 w-full relative"
                        >
                            <list.icon
                                size={20}
                                className="text-primary-text"
                            />

                            <span className="text-primary-text text-[14px]">
                                {list.name}
                            </span>

                            {path === `/${list.link}` && (
                                <motion.div
                                    layout
                                    layoutId="hover"
                                    transition={{
                                        type: "spring",
                                        damping: 30,
                                        stiffness: 300,
                                    }}
                                    className="absolute inset-0 bg-button-clr -z-1 rounded-md"
                                />
                            )}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* | Main Content | */}
            <section className="flex-1 overflow-hidden bg-background-secondary">
                <TopBar />
                <div>{children}</div>
            </section>

            {/* | Mobile bottom bar | */}
            <div className="md:hidden">
                <nav className="flex justify-around p-2 ">
                    {navList.map((list, index) => (
                        <Link
                            key={index}
                            href={`/${list.link}`}
                            className={`flex gap-2 flex-col items-center relative p-2 ${path.replace("/", "") === list.link ? "text-button-clr" : "text-primary-text"}`}
                        >
                            <list.icon size={20} />

                            {path === `/${list.link}` && (
                                <motion.div
                                    layout
                                    layoutId="hover"
                                    transition={{
                                        type: "spring",
                                        damping: 30,
                                        stiffness: 300,
                                    }}
                                    className="absolute inset-0 border-b border-b-button-clr"
                                />
                            )}
                        </Link>
                    ))}

                    <button
                        className={`flex gap-2 flex-col items-center relative p-2 ${path.replace("/", "") === "account" ? "text-button-clr" : "text-primary-text"}`}
                    >
                        <User size={20} />
                    </button>
                </nav>
            </div>
        </main>
    );
}

export default AppLayout;
