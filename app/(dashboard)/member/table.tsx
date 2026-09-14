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
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

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

    //Get current active member role
    const user = authClient.useActiveMemberRole();

    if (!user) return;

    //Set variable for filter value and give All as default
    const currentTag =
        (table.getColumn("role")?.getFilterValue() as string) || "All";

    return (
        <div>
            <div className="flex justify-between">
                <input
                    type="text"
                    className="border border-border-clr rounded-lg bg-background h-10 w-full md:w-60 text-primary-text text-[12px] p-2"
                    placeholder="Search user.."
                    value={globalFilter}
                    onChange={(e) => table.setGlobalFilter(e.target.value)}
                />

                <div className="flex gap-2 items-center">
                    {/* Check the user role 
                        || if not a member then render the add member button
                    */}
                    {["owner", "admin"].includes(user.data?.role as string) && (
                        <Link
                            href={"?invite-member=true"}
                            className="flex gap-2 items-center px-2 py-1 rounded-md bg-button-clr text-white"
                        >
                            <UserPlus size={12} />
                            <span className="text-[12px]">Member</span>
                        </Link>
                    )}

                    <RadioGroup
                        value={currentTag}
                        onValueChange={(val) =>
                            table
                                .getColumn("role")
                                ?.setFilterValue(
                                    val === "All" ? undefined : val,
                                )
                        }
                        className="flex gap-2"
                    >
                        {["All", "Owner", "Admin", "Member"].map(
                            (role, index) => (
                                <label
                                    key={index}
                                    className="flex item-center rounded-md px-2 py-1 border border-border-clr text-primary-text has-checked:bg-button-clr has-checked:text-white"
                                >
                                    <RadioGroupItem
                                        value={role}
                                        id={role.toLowerCase()}
                                        className="hidden"
                                    />
                                    <span className="text-[12px]">{role}</span>
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
