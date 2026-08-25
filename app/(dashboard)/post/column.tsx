"use client";

import { Category, StatusPost } from "@/app/generated/prisma/client";
import { createColumnHelper } from "@tanstack/react-table";

export interface UserPost {
    title: string;
    dateSubmitted: string;
    comment: number;
    upvote: number;
    status: StatusPost;
    category: Category;
    company: string;
}

const columnHelper = createColumnHelper<UserPost>();

export const columns = [
    columnHelper.display({
        id: "number",
        header: () => <span>No</span>,
        cell: ({ row }) => <p>{row.index + 1}</p>,
    }),
    columnHelper.accessor("title", { header: () => <span>Title</span> }),
    columnHelper.accessor("dateSubmitted", {
        header: () => <span>Date Submitted</span>,
    }),
    columnHelper.accessor("comment", {
        header: () => <span>Comment</span>,
    }),
    columnHelper.accessor("upvote", {
        header: () => <span>Upvote</span>,
    }),
    columnHelper.accessor("status", {
        header: () => <span>Status</span>,
    }),
    columnHelper.accessor("category", {
        header: () => <span>Category</span>,
    }),
    columnHelper.accessor("company", {
        header: () => <span>Company</span>,
    }),
];
