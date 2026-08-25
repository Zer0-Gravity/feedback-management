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
import React from "react";

function SortControl({ sort }: { sort: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const statusParams = useSearchParams();
    const itemStyle =
        "text-primary-text text-[14px] data-highlighted:bg-button-clr data-highlighted:text-white";

    const handleStatus = (value: string) => {
        const params = new URLSearchParams(statusParams);

        //Check if user choose all then the url param get deleted
        if (value === "default") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select
            value={sort}
            onValueChange={(val) => handleStatus(val as string)}
        >
            <SelectTrigger className="flex gap-2 items-center bg-button-clr text-white p-2 rounded-lg border-0">
                <SelectValue placeholder="Sort By" className="text-[12px]" />
            </SelectTrigger>

            <SelectContent align="end" className="bg-background ring-0">
                <SelectGroup>
                    <SelectLabel className="text-primary-text text-[12px]">
                        Sort By
                    </SelectLabel>
                    <SelectItem value="default" className={itemStyle}>
                        None
                    </SelectItem>
                    <SelectItem value="Newest" className={itemStyle}>
                        Newest
                    </SelectItem>
                    <SelectItem value="Oldest" className={itemStyle}>
                        Oldest
                    </SelectItem>
                    <SelectItem value="Title" className={itemStyle}>
                        TItle
                    </SelectItem>
                    <SelectItem value="Popular" className={itemStyle}>
                        Popular
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SortControl;
