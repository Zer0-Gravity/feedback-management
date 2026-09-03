"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { AuditPost } from "./column";
import { TableCustom } from "@/components/component/Table/TableCustom";
import TableController from "@/components/component/Table/TableController";

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
        getRowId: (row) => row.id,
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
            <div className="flex gap-2 md:justify-between items-baseline">
                <TableController
                    table={table}
                    globalFilter={globalFilter}
                />
            </div>

            <TableCustom table={table} />
        </div>
    );
}

export default AuditTable;
