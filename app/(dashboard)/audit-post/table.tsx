"use client";

import {
    ColumnDef,
    getCoreRowModel,
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
    });

    return (
        <div>
            <TableCustom table={table} />
        </div>
    );
}

export default AuditTable;
