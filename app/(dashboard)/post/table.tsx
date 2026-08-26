"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    RowSelectionState,
    useReactTable,
} from "@tanstack/react-table";
import { UserPost } from "./column";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { PackageOpen } from "lucide-react";
import prisma from "@/lib/prisma";
import { DeletePost } from "./actions";

function TableData({
    columns,
    data,
}: {
    columns: ColumnDef<UserPost, any>[];
    data: any;
}) {
    const [columnFilters, setColumnsFilter] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnsFilter,
        onRowSelectionChange: setRowSelection,
        getRowId: (row) => row.id,
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 15,
            },
        },
        state: {
            columnFilters,
            rowSelection,
        },
    });

    const selectedRows = table.getSelectedRowModel();

    return (
        <main className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    className="border border-border-clr rounded-lg bg-background h-10 w-full md:w-60 text-primary-text text-[12px] p-2"
                    placeholder="Search post.."
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(e) =>
                        table.getColumn("title")?.setFilterValue(e.target.value)
                    }
                />
                <div>
                    {selectedRows.rows.length !== 0 && (
                        <div className="flex gap-2 items-center">
                            <p className="text-primary-text text-[12px]">{`${selectedRows.rows.length} out off ${table.getPreSelectedRowModel().rows.length} selected`}</p>

                            <button
                                onClick={() =>
                                    DeletePost(
                                        selectedRows.rows.flatMap((r) => r.id),
                                    )
                                }
                                className="bg-red-500 px-2 py-1 rounded-lg text-[12px] text-white"
                            >
                                Delete {selectedRows.rows.length}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 border border-border-clr rounded-md overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="text-primary-text border-border-clr"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length !== 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={`text-primary-text text-[12px] border-border-clr ${row.getIsSelected() ? "bg-background text-secondary-text" : null}`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}{" "}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <div className="w-full p-2 rounded-lg flex justify-center items-center gap-2 text-primary-text text-[12px]">
                                        <PackageOpen size={14} />
                                        <p>No post found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex gap-5 justify-end">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="border-button-clr border text-[14px] text-button-clr px-2 py-1 rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="border-button-clr border text-[14px] text-button-clr px-2 py-1 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </main>
    );
}

export default TableData;
