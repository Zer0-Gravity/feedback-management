"use client";

import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { AuditPost } from "./column";
import { TableCustom } from "@/components/component/Table/TableCustom";

function AuditTable({
    columns,
    data,
}: {
    columns: ColumnDef<AuditPost, any>[];
    data: any;
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 15,
            },
        },
    });

    return (
        <div>
            <TableCustom table={table} />
        </div>
    );
}

export default AuditTable;
