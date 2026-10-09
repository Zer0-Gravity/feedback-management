"use client";

import { Invitation, User } from "@/app/generated/prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Mail, Search } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ListInvitations = Invitation & { user: User }; //Combine both invitation type with User

interface ListProps {
    listDb: ListInvitations[];
    search: string;
    status: string;
}

interface BadgeType {
    [key: string]: {
        color: string;
        label: string;
    };
}

function ListInvitation({ listDb, search, status }: ListProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const path = usePathname();

    const [value, setValue] = useState<string>(search ?? "");

    const badgeColor: BadgeType = {
        accepted: { color: "#2AAF6D", label: "Accepted" },
        pending: { color: "#DC7E15", label: "Pending" },
        rejected: { color: "#ec1405ff", label: "Rejected" },
    };

    useEffect(() => {
        // Skip url matches
        if (value === (searchParams.get("search") ?? "")) return;

        const timeout = setTimeout(() => {
            const param = new URLSearchParams(searchParams);

            //Check the value
            if (value) {
                param.set("search", value);
            } else {
                param.delete("search");
            }

            router.replace(`${path}?${param.toString()}`);
        }, 400);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleStatus = (value: string) => {
        const param = new URLSearchParams(searchParams);

        if (value === "all") {
            param.delete("status");
        } else {
            param.set("status", value);
        }

        router.push(`${path}?${param.toString()}`);
    };

    return (
        <div className="space-y-3">
            <div className="flex md:justify-between item-center  flex-col md:flex-row  gap-2">
                <div className="relative h-10  md:w-150 w-full bg-card-clr rounded-md">
                    <input
                        type="search"
                        className="h-full w-full text-[12px] text-secondary-text py-2 pl-10"
                        placeholder="Search invitation"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Search
                        size={14}
                        className="absolute top-1/2 -translate-y-1/2 left-4 text-secondary-text"
                    />
                </div>
                <RadioGroup
                    value={status}
                    onValueChange={(val) => handleStatus(val ?? "")}
                    className="flex gap-2 md:w-fit w-full"
                >
                    {["all", "pending", "rejected", "accepted"].map(
                        (statusTag, index) => (
                            <label
                                key={index}
                                className="group relative h-10 px-2 flex items-center justify-center text-secondary-text border border-border-clr rounded-md has-checked:text-white transition-colors"
                            >
                                <RadioGroupItem
                                    value={statusTag}
                                    className="hidden"
                                />
                                <span className="text-[12px] z-10 group-checked:font-semibold">
                                    {statusTag.charAt(0).toUpperCase() +
                                        statusTag.slice(1)}
                                </span>

                                {statusTag === status && (
                                    <motion.div
                                        layoutId="inv-status"
                                        transition={{
                                            type: "spring",
                                            damping: 30,
                                            stiffness: 280,
                                        }}
                                        className="absolute inset-0 bg-accent-clr rounded-md z-4"
                                    />
                                )}
                            </label>
                        ),
                    )}
                </RadioGroup>
            </div>

            {/* Card list */}

            <div className="flex flex-col gap-2">
                {listDb.length !== 0 ? (
                    listDb.map((list) => {
                        const statusBadge = badgeColor[list.status];

                        return (
                            <div
                                key={list.id}
                                className="flex flex-col gap-3 p-2 bg-card-clr rounded-md"
                            >
                                {/* Main content card */}
                                <div className="flex justify-between items-center w-full">
                                    <div className="flex gap-2 items-center">
                                        <Mail
                                            size={20}
                                            className="text-primary-text"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <p className="text-[14px] font-semibold text-primary-text">
                                                {list.email}
                                            </p>
                                            <div className="flex gap-6 items-center">
                                                <p className="text-secondary-text text-[12px]">
                                                    Invited by:
                                                    <span className="text-primary-text font-medium">
                                                        {` ${list.user.name}`}
                                                    </span>
                                                </p>
                                                <p className="text-secondary-text text-[12px]">{`Date: ${format(list.createdAt, "PPP")}`}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            backgroundColor: `${statusBadge.color}30`,
                                        }}
                                        className="flex items-center justify-center gap-2 py-1.5 px-3 rounded-full"
                                    >
                                        <div
                                            style={{
                                                backgroundColor: `${statusBadge.color}`,
                                            }}
                                            className="h-2 w-2 rounded-full"
                                        />
                                        <p
                                            style={{
                                                color: `${statusBadge.color}`,
                                            }}
                                            className="text-[12px]"
                                        >
                                            {statusBadge.label}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full border border-border-clr rounded-md p-5 flex items-center justify-center">
                        <h2 className="text-primary-text text-[12px]">
                            No invitation
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListInvitation;
