"use client";

import {
    Hourglass,
    Loader2,
    Newspaper,
    Plus,
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
    const { data: role, isPending, error } = authClient.useActiveMemberRole();

    //Loading component
    if (isPending) {
        return (
            <div className="flex flex-col h-screen">
                <TopBar />
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Loader2
                        size={14}
                        className="animate-spin text-primary-text"
                    />
                    <h1 className="text-primary-text text-[14px]">
                        Loading Data...
                    </h1>
                </div>
            </div>
        );
    }

    // Render different page if the user not part of any organization yet
    if (error || !role) {
        return (
            <div className="flex flex-col h-screen">
                <TopBar />
                <div className="h-full w-full bg-background-secondary flex justify-center">
                    <div className="mt-5 space-y-3">
                        <div>
                            <h1 className="text-[20px] text-primary-text font-bold">
                                Currently not part of any organizations
                            </h1>
                            <p className="text-[14px] text-secondary-text md:max-w-200">
                                Contact your system administrator or owner to
                                add your email address to the company. This page
                                will update automatically once you are added.
                            </p>
                        </div>
                        <div className="text-secondary-text text-[12px]">
                            OR
                        </div>
                        <div className="space-y-3">
                            <p className="text-primary-text text-[14px]">
                                You can create your own organization
                            </p>
                            <Link
                                href={"?new-organization=true"}
                                className="bg-button-clr text-white rounded-md p-2 flex gap-2 items-center active:scale-98 w-fit"
                            >
                                <Plus size={12} />
                                <span className="text-[12px]">
                                    Create Organization
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
