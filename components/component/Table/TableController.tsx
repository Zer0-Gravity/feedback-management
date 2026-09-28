"use client";

import { deletePost } from "@/app/(dashboard)/post/actions";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table } from "@tanstack/react-table";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";

interface TableProps<TData> {
    table: Table<TData>;
    globalFilter: string;
}

function TableController<TData extends { id: string }>({
    table,
    globalFilter,
}: TableProps<TData>) {
    const selectedRow = table.getSelectedRowModel(); //Get the selected row
    const currentStatus =
        (table.getColumn("status")?.getFilterValue() as string) || "All";
    const currentCategory =
        (table.getColumn("category")?.getFilterValue() as string) || "All";

    const handleDelete = async () => {
        const ids = selectedRow.rows.map((row) => row.original.id);

        try {
            await deletePost(ids);
            table.resetRowSelection();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex gap-3 flex-col">
            <div className="flex gap-3">
                <div
                    className={`relative flex-1 h-10 rounded-lg border ${selectedRow.rows.length !== 0 ? "border-button-clr bg-button-clr/10" : "border-border-clr bg-card-clr"}`}
                >
                    {selectedRow.rows.length === 0 ? (
                        <>
                            <input
                                type="text"
                                className="h-full w-full text-secondary-text text-[12px] py-2 px-10 outline-none"
                                placeholder="Search post.."
                                value={globalFilter}
                                onChange={(e) =>
                                    table.setGlobalFilter(e.target.value)
                                }
                            />
                            <Search
                                size={14}
                                className="text-secondary-text absolute top-1/2 -translate-y-1/2 left-4"
                            />
                        </>
                    ) : (
                        <div className="h-full flex justify-between items-center p-2">
                            <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 bg-button-clr rounded-full" />
                                <p className="text-primary-text text-[12px]">{`${selectedRow.rows.length} Selected`}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <button
                                    onClick={() => table.resetRowSelection()}
                                    className="py-1 px-2 bg-card-clr border border-border-clr rounded-md text-[12px] text-secondary-text"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="py-1 px-2 bg-red-500 rounded-md text-[12px] text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <Popover>
                    <PopoverTrigger className="flex gap-2 items-center bg-button-clr text-white rounded-md py-1 px-2 text-[12px]">
                        <Filter size={12} />
                        <span>Filter</span>
                    </PopoverTrigger>

                    <PopoverContent className="ring-0 bg-background min-y-[300px]!">
                        <div>
                            {/* Status */}
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <PopoverHeader className="text-primary-text text-[14px]">
                                        Status
                                    </PopoverHeader>
                                    <RadioGroup
                                        value={currentStatus}
                                        onValueChange={(val) =>
                                            table
                                                .getColumn("status")
                                                ?.setFilterValue(
                                                    val === "All"
                                                        ? undefined
                                                        : val,
                                                )
                                        }
                                        className="flex flex-wrap "
                                    >
                                        {[
                                            "All",
                                            "Backlog",
                                            "Accepted",
                                            "Rejected",
                                            "In_Progress",
                                            "Review",
                                            "Completed",
                                        ].map((status, index) => (
                                            <label
                                                key={index}
                                                className="group flex items-center justify-center gap-2 has-checked:bg-button-clr p-1 rounded-md border border-border-clr"
                                            >
                                                <RadioGroupItem
                                                    value={status}
                                                    id={status.toLowerCase()}
                                                    className="hidden"
                                                />
                                                <span className="group-has-checked:text-primary-text text-[12px] text-secondary-text">
                                                    {status.replace("_", " ")}
                                                </span>
                                            </label>
                                        ))}
                                    </RadioGroup>
                                </div>
                                <div className="space-y-3">
                                    <PopoverHeader className="text-primary-text text-[14px] ">
                                        Category
                                    </PopoverHeader>
                                    <RadioGroup
                                        value={currentCategory}
                                        onValueChange={(val) =>
                                            table
                                                .getColumn("category")
                                                ?.setFilterValue(
                                                    val === "All"
                                                        ? undefined
                                                        : val,
                                                )
                                        }
                                        className="flex flex-wrap "
                                    >
                                        {[
                                            "All",
                                            "Feature_Request",
                                            "Integration",
                                            "Bug_Report",
                                        ].map((status, index) => (
                                            <label
                                                key={index}
                                                className="group flex items-center justify-center gap-2 has-checked:bg-button-clr p-1 rounded-md border border-border-clr"
                                            >
                                                <RadioGroupItem
                                                    value={status}
                                                    id={status.toLowerCase()}
                                                    className="hidden"
                                                />
                                                <span className="group-has-checked:text-primary-text text-[12px] text-secondary-text">
                                                    {status.replace("_", " ")}
                                                </span>
                                            </label>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Link
                    href={"/post/new"}
                    className="flex gap-2 items-center bg-button-clr/10 border border-button-clr text-button-clr rounded-md py-1 px-2 text-[12px]"
                >
                    <Plus size={14} />
                    <span>Post</span>
                </Link>
            </div>
        </div>
    );
}

export default TableController;
