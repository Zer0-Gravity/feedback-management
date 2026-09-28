"use client";

import {
    Building2,
    Loader2,
    Newspaper,
    Plus,
    Send,
    Settings,
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
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Welcome from "./EmptyState/Welcome";

function AppLayout({ children }: { children: ReactNode }) {
    const navList = [
        { link: "feed", name: "Feed", icon: Newspaper },
        { link: "roadmap", name: "Roadmap", icon: SquareKanban },
        { link: "post", name: "Post", icon: Send },
        { link: "member", name: "Member", icon: Users },
        { link: "audit-post", name: "Audit Post", icon: TableProperties },
    ];

    const path = usePathname();

    //Get the user account information
    const userDb = authClient.useSession();

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
                <Welcome />
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
                {/* Desktop Logo and Account */}
                <div className="flex justify-between items-center mb-15">
                    <Image
                        src="/VotifyFull.svg"
                        width={100}
                        height={200}
                        alt="desktop-logo"
                    />

                    <Popover>
                        <PopoverTrigger>
                            <Avatar className="bg-card-clr size-7">
                                <AvatarImage
                                    src={userDb.data?.user.image as string}
                                />
                                <AvatarFallback className="text-[10px] font-semibold text-secondary-text">
                                    {userDb.data?.user.name
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent
                            className="bg-background-secondary ring-0 max-w-60"
                            align="start"
                            sideOffset={10}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="font-bold text-primary-text text-[14px]">
                                        {userDb.data?.user.name}
                                    </h1>
                                    <p className="text-secondary-text text-[12px]">
                                        {userDb.data?.user.email}
                                    </p>
                                </div>

                                <Link href="/account">
                                    <Settings
                                        size={20}
                                        className="text-primary-text"
                                    />
                                </Link>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

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
