"use client";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MemberList } from "./column";
import { TableCustom } from "@/components/component/Table/TableCustom";
import TableController from "@/components/component/Table/TableController";
import { useState } from "react";
import { RadioGroup } from "@base-ui/react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { UserPlus } from "lucide-react";

function MemberTable({
    columns,
    data,
}: {
    columns: ColumnDef<MemberList, any>[];
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
                pageSize: 15,
            },
        },
        state: {
            globalFilter,
        },
    });

    const currentTag =
        (table.getColumn("role")?.getFilterValue() as string) || "All";

    return (
        <div>
            <div className="flex justify-between">
                <input
                    type="text"
                    className="border border-border-clr rounded-lg bg-background h-10 w-full md:w-60 text-primary-text text-[12px] p-2"
                    placeholder="Search post.."
                    value={globalFilter}
                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                />

                <div className="flex gap-2 items-center">
                    <button className="flex gap-2 items-center px-2 py-1 rounded-md bg-button-clr">
                        <UserPlus size={12} />
                        <span>Member</span>
                    </button>

                    <RadioGroup
                        value={currentTag}
                        onValueChange={(val) =>
                            table
                                .getColumn("role")
                                ?.setFilterValue(
                                    val === "All" ? undefined : val,
                                )
                        }
                        className="px-2 py-1 border border-border-clr rounded-md has-checked:bg-button-clr has-checked:border-none"
                    >
                        {["all", "owner", "admin", "member"].map(
                            (role, index) => (
                                <label key={index}>
                                    <RadioGroupItem
                                        value={role}
                                        id={role.toLowerCase()}
                                        className="hidden"
                                    />
                                    <span className="text-[12px]">
                                        {role.charAt(0).toUpperCase()}
                                    </span>
                                </label>
                            ),
                        )}
                    </RadioGroup>
                </div>
            </div>
            <TableCustom table={table} />
        </div>
    );
}

export default MemberTable;
