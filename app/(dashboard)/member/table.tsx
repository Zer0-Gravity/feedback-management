"use client";

import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MemberList } from "./column";
import { TableCustom } from "@/components/component/Table/TableCustom";
import TableController from "@/components/component/Table/TableController";
import { useState } from "react";

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
    });

    return (
        <div>
            <TableController table={table} globalFilter={globalFilter} />
            <TableCustom table={table} />
        </div>
    );
}

export default MemberTable;
