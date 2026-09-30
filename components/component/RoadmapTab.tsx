"use client";

import { Post, User } from "@/app/generated/prisma/client";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
    CATEGORY_CONFIG,
    EMPTY_STATE,
    tabCategory,
    tabsStatus,
} from "@/utils/func";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dot } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import UpvoteButton from "./UpvoteButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Database = Post & {
    user: User;
    _count: {
        upVotes: number;
    };
};

interface RoadmapProps {
    database: Database[];
    search: string;
    status: string;
    category: string;
}

function RoadmapTab({ database, search, status, category }: RoadmapProps) {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = (value: string) => {
        const param = new URLSearchParams(searchParams);
        param.set("search", value);

        //Update url
        router.push(`${pathName}?${param.toString()}`);
    };

    //Function for handling a filter
    const handleFilter = (value: string, label: string) => {
        const param = new URLSearchParams(searchParams);

        //Check if the filter value is ALL
        if (value === "All") {
            param.delete(`${label}`); //Delete the url query
        } else {
            param.set(`${label}`, value);
        }

        router.push(`${pathName}?${param.toString()}`);
    };

    return (
        <div className="flex flex-col gap-3 h-full min-h-0">
            <RadioGroup
                className="flex gap-3"
                value={status ? status : "All"}
                onValueChange={(val) => handleFilter(val, "status")}
            >
                {tabsStatus.map((status, index) => (
                    <label
                        key={index}
                        className="group p-1 md:p-3 border border-border-clr bg-card-clr h-fit md:h-[100px] w-[250px] text-secondary-text rounded-md has-checked:bg-accent-clr/10  has-checked:border-accent-clr has-checked:text-primary-text flex flex-col justify-between"
                    >
                        <RadioGroupItem
                            value={status.value}
                            className="hidden"
                        />
                        <div className="flex gap-2 items-center">
                            <div
                                className="w-2 h-2 rounded-full hidden md:flex"
                                style={{ backgroundColor: status.color }}
                            />
                            <p className="text-[12px] md:text-[12px]">
                                {status.label}
                            </p>
                        </div>
                        <p className="text-primary-text font-bold text-[25px] hidden md:flex">
                            {
                                database.filter(
                                    (data) => data.status === status.value,
                                ).length
                            }
                        </p>
                    </label>
                ))}
            </RadioGroup>

            <div className="flex gap-4 flex-col md:flex-row items-center">
                <input
                    type="search"
                    className="h-10 w-full border border-border-clr rounded-lg bg-card-clr  text-secondary-text text-[12px] p-2"
                    placeholder="Search post"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <RadioGroup
                    className="flex gap-2"
                    value={category ? category : "All"}
                    onValueChange={(val) => handleFilter(val, "category")}
                >
                    {tabCategory.map((cat, index) => (
                        <label
                            key={index}
                            className="px-2 py-1 flex items-center justify-center border border-border-clr bg-card-clr rounded-full text-secondary-text has-checked:bg-accent-clr/10 has-checked:text-primary-text has-checked:border-accent-clr"
                        >
                            <RadioGroupItem
                                value={cat.value}
                                className="hidden"
                            />
                            <p className="text-[12px]">{cat.label}</p>
                        </label>
                    ))}
                </RadioGroup>
            </div>

            <div className="flex flex-1 flex-col gap-2 min-h-0 overflow-y-auto pb-24 hide-scrollbar">
                {database.length !== 0 ? (
                    database.map((data) => {
                        const category =
                            CATEGORY_CONFIG[data.category.toLowerCase()];

                        return (
                            <div
                                key={data.id}
                                className="bg-card-clr p-3 flex gap-2 items-center"
                            >
                                <UpvoteButton
                                    postId={data.id}
                                    count={data._count.upVotes}
                                />

                                <div>
                                    <div className="flex gap-2">
                                        <p className="font-bold text-primary-text">
                                            {data.title}
                                        </p>
                                        <p
                                            style={{
                                                color: category.color,
                                                backgroundColor: `${category.color}20`,
                                            }}
                                            className="text-[12px] font-medium px-2 py-1 flex items-center justify-center rounded-full"
                                        >
                                            {category.label}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <div className="flex items-center justify-center">
                                            <Avatar>
                                                <AvatarImage />
                                                <AvatarFallback className="bg-background-secondary text-[10px] text-primary-text size-6">
                                                    {data.user.name
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p className="text-[12px] text-secondary-text">
                                                {data.user.name}
                                            </p>
                                        </div>
                                        <Dot className="text-secondary-text" />
                                        <p className="text-[12px] text-secondary-text">
                                            {formatDistanceToNow(
                                                data.created_at,
                                                {
                                                    addSuffix: true,
                                                },
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <EmptyState status={status} />
                )}
            </div>
        </div>
    );
}

function EmptyState({ status }: { status: string }) {
    // Set empty state based on the current filter status
    const emptyState =
        EMPTY_STATE[status.toLowerCase() as keyof typeof EMPTY_STATE] ??
        EMPTY_STATE.all;

    return (
        <div className="border-2  p-5 flex flex-col items-center justify-center gap-2 rounded-lg border-border-clr">
            <h1 className="text-primary-text font-bold text-[20px]">
                {emptyState.header}
            </h1>
            <p className="text-secondary-text text-[12px]">{emptyState.desc}</p>
        </div>
    );
}
export default RoadmapTab;
