"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
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

function TableData({
    columns,
    data,
}: {
    columns: ColumnDef<UserPost, any>[];
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
                pageSize: 20,
            },
        },
    });

    return (
        <main className="flex flex-col gap-5">
            <div className="flex-1 border border-border-clr rounded-md overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="text-primary-text"
                                    >
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
                                    data-state={
                                        row.getIsSelected() && "bg-white"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-primary-text text-[12px]"
                                        >
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
                                    <div>No submission found</div>
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
