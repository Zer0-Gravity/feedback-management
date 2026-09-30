import { Checkbox } from "@/components/ui/checkbox";
import { Row, Table } from "@tanstack/react-table";

interface CheckBoxHeaderProps<TData> {
    table: Table<TData>;
}

interface CheckboxCell<TData> {
    row: Row<TData>;
}

export function CheckboxHeader<TData>({ table }: CheckBoxHeaderProps<TData>) {
    return (
        <>
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomeRowsSelected() &&
                    !table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(val) =>
                    table.toggleAllPageRowsSelected(!!val)
                }
                aria-label="select-row"
                className="data-checked:bg-accent-clr"
            />
        </>
    );
}

export function CheckboxCell<TData>({ row }: CheckboxCell<TData>) {
    return (
        <>
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(val) => row.toggleSelected(!!val)}
                aria-label="select-table"
                className="data-checked:bg-accent-clr"
            />
        </>
    );
}
