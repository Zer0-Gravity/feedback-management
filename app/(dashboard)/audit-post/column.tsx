"use client";

import { Category, StatusPost } from "@/app/generated/prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";
import { CATEGORY_CONFIG, STATUS_CONFIG } from "@/utils/func";
import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLink, MessageCircle, Triangle } from "lucide-react";
import Link from "next/link";
import { updateStatusPost } from "./actions";
import { STATUS_LIST } from "../../../utils/func";

export interface AuditPost {
    id: string;
    title: string;
    dateSubmitted: string;
    updated: string | null;
    comment: number;
    upvote: number;
    author: string;
    status: StatusPost;
    category: Category;
}

const columnHelper = createColumnHelper<AuditPost>();

export const columns = [
    columnHelper.display({
        id: "check",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomeRowsSelected() &&
                    !table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(val) =>
                    table.toggleAllPageRowsSelected(!!val)
                }
                aria-label="select-row"
                className="data-checked:bg-accent-clr"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(val) => row.toggleSelected(!!val)}
                aria-label="select-table"
                className="data-checked:bg-accent-clr"
            />
        ),
    }),
    columnHelper.accessor("title", { header: () => <span>Title</span> }),
    columnHelper.accessor("dateSubmitted", {
        header: () => <span>Date Submitted</span>,
    }),
    columnHelper.accessor("updated", {
        header: () => <span>Updated</span>,
    }),
    columnHelper.accessor("comment", {
        header: () => (
            <span>
                <MessageCircle size={14} />
            </span>
        ),
    }),
    columnHelper.accessor("upvote", {
        header: () => (
            <span>
                <Triangle size={14} />
            </span>
        ),
    }),
    columnHelper.accessor("author", { header: () => <span>Author</span> }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ row }) => {
            const status = STATUS_CONFIG[row.original.status.toLowerCase()];

            return (
                <Select
                    value={row.original.status}
                    onValueChange={(val) =>
                        updateStatusPost(val as StatusPost, row.original.id)
                    }
                >
                    <SelectTrigger className="p-0 border-none">
                        <span
                            style={{
                                backgroundColor: `${status.color}50`,
                                color: `${status.color}`,
                                padding: "2px 5px 2px 5px",
                                fontWeight: "600",
                                borderRadius: "5px",
                                fontSize: "12px",
                            }}
                        >
                            {row.original.status}
                        </span>
                    </SelectTrigger>

                    <SelectContent className="bg-background">
                        <SelectGroup>
                            <SelectLabel className="text-primary-text text-[12px]">
                                Status
                            </SelectLabel>
                            {STATUS_LIST.map((status, index) => (
                                <SelectItem
                                    key={index}
                                    className="text-secondary-text data-highlighted:bg-accent-clr data-highlighted:text-primary-text"
                                    value={status.value}
                                >
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            );
        },
    }),
    columnHelper.accessor("category", {
        header: () => <span>Category</span>,
        cell: ({ row }) => {
            const category =
                CATEGORY_CONFIG[row.original.category.toLowerCase()];

            return (
                <span
                    style={{
                        backgroundColor: `${category.color}50`,
                        color: `${category.color}`,
                        padding: "2px 5px 2px 5px",
                        fontWeight: "600",
                        borderRadius: "5px",
                    }}
                >
                    {category.label}
                </span>
            );
        },
    }),
    columnHelper.display({
        id: "viewLink",
        header: () => <span>View</span>,
        cell: ({ row }) => (
            <Link href={`post/${row.original.id}`}>
                <ExternalLink size={12} />
            </Link>
        ),
    }),
];
