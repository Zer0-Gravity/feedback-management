import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table } from "@tanstack/react-table";
import { Filter } from "lucide-react";

interface TableProps<TData> {
    table: Table<TData>;
    globalFilter: string;
}

function TableController<TData>({ table, globalFilter }: TableProps<TData>) {
    const selectedRow = table.getSelectedRowModel(); //Get the selected row
    const currentStatus =
        (table.getColumn("status")?.getFilterValue() as string) || "All";
    const currentCategory =
        (table.getColumn("category")?.getFilterValue() as string) || "All";

    return (
        <div className="w-full flex gap-3 md:justify-between">
            <div className="flex flex-1 flex-col gap-3">
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

            <Popover>
                <PopoverTrigger className="flex gap-2 items-center bg-button-clr text-white rounded-md h-10 px-2 text-[14px]">
                    <Filter size={12} />
                    <span>Filter</span>
                </PopoverTrigger>

                <PopoverContent className="ring-0 bg-background min-y-[300px]!">
                    <div>
                        {/* Status */}
                        <div className="space-y-2">
                            <PopoverHeader className="text-secondary-text">
                                Status
                            </PopoverHeader>
                            <RadioGroup
                                value={currentStatus}
                                onValueChange={(val) =>
                                    table
                                        .getColumn("status")
                                        ?.setFilterValue(
                                            val === "All" ? undefined : val,
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
                                            className="hidden peer"
                                        />
                                        <span className="group-has-checked:text-primary-text text-[12px] text-secondary-text">
                                            {status.replace("_", " ")}
                                        </span>
                                    </label>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default TableController;
