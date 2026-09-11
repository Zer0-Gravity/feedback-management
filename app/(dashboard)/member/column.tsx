"use client";

import {
    CheckboxCell,
    CheckboxHeader,
} from "@/components/component/Table/CheckBox";
import { createColumnHelper } from "@tanstack/react-table";

type role = "owner" | "admin" | "member";

export interface MemberList {
    id: string;
    name: string;
    email: string;
    role: role;
}

const columnHelper = createColumnHelper<MemberList>();

export const columns = [
    columnHelper.display({
        id: "checkbox",
        header: ({ table }) => <CheckboxHeader table={table} />,
        cell: ({ row }) => <CheckboxCell row={row} />,
    }),
    columnHelper.accessor("name", {
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor("email", {
        header: () => <span>E-mail</span>,
    }),
    columnHelper.accessor("role", {
        header: () => <span>Role</span>,
    }),
];
