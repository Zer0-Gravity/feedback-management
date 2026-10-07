"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    flexRender,
    type Table as ReactTableType,
} from "@tanstack/react-table";
import { PackageOpen } from "lucide-react";

interface CustomTable<TData> {
    table: ReactTableType<TData>;
}

export function TableCustom<TData>({ table }: CustomTable<TData>) {
    const columns = table.getAllColumns().length;

    return (
        <div className="space-y-4 ">
            <div className="bg-card-clr rounded-lg p-2">
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
                                    className={`text-primary-text text-[12px] rounded-md border-border-clr h-12 ${row.getIsSelected() ? "bg-background-secondary text-secondary-text" : null}`}
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
                                <TableCell colSpan={columns}>
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
                    className="border-accent-clr border text-[14px] text-accent-clr px-2 py-1 rounded-lg disabled:opacity-50"
                >
                    Prev
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="border-accent-clr border text-[14px] text-accent-clr px-2 py-1 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
