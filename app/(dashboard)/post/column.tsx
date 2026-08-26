"use client";

import { Category, StatusPost } from "@/app/generated/prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { CATEGORY_CONFIG, STATUS_CONFIG } from "@/utils/func";
import { createColumnHelper } from "@tanstack/react-table";
import { MessageCircle, Triangle } from "lucide-react";

export interface UserPost {
    id: string;
    title: string;
    dateSubmitted: string;
    comment: number;
    upvote: number;
    status: StatusPost;
    category: Category;
    company: string;
    companyEmail: string;
}

const columnHelper = createColumnHelper<UserPost>();

export const columns = [
    columnHelper.display({
        id: "select",
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
                aria-label="select-all"
                className="data-checked:bg-button-clr"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(val) => row.toggleSelected(!!val)}
                aria-label="select-row"
                className="data-checked:bg-button-clr"
            />
        ),
    }),
    columnHelper.accessor("title", { header: () => <span>Title</span> }),
    columnHelper.accessor("dateSubmitted", {
        header: () => <span>Date Submitted</span>,
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
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
        cell: ({ row }) => {
            const status = STATUS_CONFIG[row.original.status.toLowerCase()];

            return (
                <span
                    style={{
                        backgroundColor: `${status.color}50`,
                        color: `${status.color}`,
                        padding: "2px 5px 2px 5px",
                        fontWeight: "600",
                        borderRadius: "5px",
                    }}
                >
                    {status.label}
                </span>
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
    columnHelper.accessor("company", {
        header: () => <span>Company</span>,
    }),
    columnHelper.accessor("companyEmail", {
        header: () => <span>email</span>,
    }),
];
