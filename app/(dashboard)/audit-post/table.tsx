"use client";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { AuditPost } from "./column";
import { TableCustom } from "@/components/component/Table/TableCustom";

function AuditTable({
    columns,
    data,
}: {
    columns: ColumnDef<AuditPost, any>[];
    data: any;
}) {
    const [globalFilter, setGlobalFilter] = useState<string>("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        },
        state: {
            globalFilter,
        },
    });

    return (
        <div className="flex flex-col gap-3">
            <input
                type="text"
                className="border border-border-clr rounded-lg bg-background h-10 w-full md:w-60 text-primary-text text-[12px] p-2"
                placeholder="Search post.."
                value={globalFilter}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
            />

            <TableCustom table={table} />
        </div>
    );
}

export default AuditTable;
