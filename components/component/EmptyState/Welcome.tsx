"use client";

import { ReactNode } from "react";
import TopBar from "../TopBar/TopBar";
import { Building2, LucideIcon, Mail, Plus, User } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

function Welcome() {
    const user = authClient.useSession();

    return (
        <>
            <TopBar />
            <div className="h-full w-full bg-background-secondary flex flex-col gap-3 justify-center items-center">
                <div className="bg-button-clr/20 w-15 h-15 rounded-xl flex items-center justify-center">
                    <Building2 className="text-button-clr" size={30} />
                </div>
                <div className="flex justify-around items-center gap-4">
                    <p className="text-primary-text text-[14px] flex items-center gap-2">
                        <User size={14} />
                        <span>{`Logged in as: ${user.data?.user.name}`}</span>
                    </p>
                    <p className="text-primary-text text-[14px] flex items-center gap-2">
                        <Mail size={14} />
                        <span>{`Email: ${user.data?.user.email}`}</span>
                    </p>
                </div>
                <div className="flex justify-center flex-col items-center">
                    <h1 className="text-primary-text text-[30px] font-bold">
                        You&apos;re not in an organization yet
                    </h1>
                    <p className="text-[14px] text-secondary-text">
                        Organizations hold your team, data and settings in one
                        place. Pick how you&apos;d like to get started.
                    </p>
                </div>
                <div className="flex gap-3">
                    {/* Create new */}
                    <Card
                        icon={Plus}
                        header="Recommended"
                        title="Create an organization"
                        desc="Start fresh as the owner. Set it up in under a minute and invite
                your team later."
                    >
                        <Link
                            href={"?new-organization=true"}
                            className="bg-button-clr text-white rounded-md p-2 flex gap-2 items-center active:scale-98 w-full justify-center"
                        >
                            <Plus size={12} />
                            <span className="text-[12px]">
                                Create Organization
                            </span>
                        </Link>
                    </Card>

                    {/* Ask invitation */}
                    <Card
                        icon={Mail}
                        header="Already have one?"
                        title="Ask to be added"
                        desc="Send your email to your admin or owner. To get your invitation"
                    ></Card>

                    {/* Select existing */}
                    <Card
                        icon={Plus}
                        header="Switch"
                        title="Select an organization"
                        desc="Belong to one already? Choose it from your list to continue."
                    ></Card>
                </div>
                <div className="flex gap-2 items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[14px] text-secondary-text">
                        Waiting for an action. This page updates automatically
                        once you&apos;re start.
                    </p>
                </div>
            </div>
        </>
    );
}

interface CardProps {
    header: string;
    icon: LucideIcon;
    title: string;
    desc: string;
    children?: ReactNode;
}

function Card({ header, icon: Icon, title, desc, children }: CardProps) {
    return (
        <div className="w-65 rounded-xl bg-card-clr border-2 border-button-clr p-5 space-y-3">
            <p className="text-button-clr font-semibold text-[14px]">
                {header}
            </p>
            <div className="h-10 w-10 rounded-md bg-button-clr/10 flex items-center justify-center">
                <Icon size={20} className="text-button-clr" />
            </div>
            <h1 className="text-primary-text font-semibold">{title}</h1>
            <p className="text-secondary-text text-[12px]">{desc}</p>
            {children}
        </div>
    );
}

export default Welcome;
