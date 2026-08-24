"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CategoryControl({ category }: { category: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const statusParams = useSearchParams();
    const itemStyle =
        "text-primary-text text-[14px] data-highlighted:bg-button-clr data-highlighted:text-white";

    const handleStatus = (value: string) => {
        const params = new URLSearchParams(statusParams);

        //Check if user choose all then the url param get deleted
        if (value === "All") {
            params.delete("category");
        } else {
            params.set("category", value);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select
            value={category}
            onValueChange={(val) => handleStatus(val as string)}
        >
            <SelectTrigger className="flex gap-2 items-center bg-button-clr text-white p-2 rounded-lg">
                <SelectValue placeholder="Category" />
            </SelectTrigger>

            <SelectContent align="end" className="bg-background ring-0">
                <SelectGroup>
                    <SelectLabel className="text-primary-text text-[12px]">
                        Status
                    </SelectLabel>
                    <SelectItem value="All" className={itemStyle}>
                        All
                    </SelectItem>
                    <SelectItem value="Feature_Request" className={itemStyle}>
                        Feature Request
                    </SelectItem>
                    <SelectItem value="Integration" className={itemStyle}>
                        Integration
                    </SelectItem>
                    <SelectItem value="Bug_Report" className={itemStyle}>
                        Bug Report
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default CategoryControl;
