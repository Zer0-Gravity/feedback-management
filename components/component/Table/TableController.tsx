import { Table } from "@tanstack/react-table";

interface TableProps<TData> {
    table: Table<TData>;
    globalFilter: string;
}

function TableController<TData>({ table, globalFilter }: TableProps<TData>) {
    const selectedRow = table.getSelectedRowModel();

    return (
        <div className="flex flex-col gap-3">
            <input
                type="text"
                className="border border-border-clr rounded-lg bg-background h-10 w-full md:w-60 text-primary-text text-[12px] p-2"
                placeholder="Search post.."
                value={globalFilter}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
            />
            <div className="flex gap-3 items-center h-5">
                <p className="text-secondary-text text-[12px]">{`${selectedRow.rows.length} selected out of ${table.getPreSelectedRowModel().rows.length}`}</p>

                {selectedRow.rows.length > 0 && (
                    <button className="bg-red-500 text-white p-1 rounded-md text-[12px]">
                        Delete?
                    </button>
                )}
            </div>
        </div>
    );
}

export default TableController;
