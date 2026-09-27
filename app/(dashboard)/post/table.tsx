"use client";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { UserPost } from "./column";
import { useState } from "react";
import { TableCustom } from "@/components/component/Table/TableCustom";
import TableController from "@/components/component/Table/TableController";

function TableData({
    columns,
    data,
}: {
    columns: ColumnDef<UserPost, any>[];
    data: any;
}) {
    const [globalFilter, setGlobalFilter] = useState<any>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        getRowId: (row) => row.id,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 15,
            },
        },
        state: {
            globalFilter,
            rowSelection,
            sorting,
        },
    });

    return (
        <main className="flex flex-col gap-5">
            <div className="flex gap-2 md:justify-between items-baseline">
                <TableController table={table} globalFilter={globalFilter} />
            </div>

            <TableCustom table={table} />
        </main>
    );
}

export default TableData;
