"use client";

import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectLabel,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function StatusControl({ status }: { status: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const statusParams = useSearchParams();
    const itemStyle =
        "text-primary-text text-[14px] data-highlighted:bg-button-clr data-highlighted:text-white";

    const handleStatus = (value: string) => {
        const params = new URLSearchParams(statusParams);

        //Check if user choose all then the url param get deleted
        if (value === "All") {
            params.delete("status");
        } else {
            params.set("status", value);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select
            value={status}
            onValueChange={(val) => handleStatus(val as string)}
        >
            <SelectTrigger className="flex gap-2 items-center bg-button-clr text-white p-2 rounded-lg border-0">
                <SelectValue placeholder="Status" className="text-[12px]" />
            </SelectTrigger>

            <SelectContent align="end" className="bg-background ring-0">
                <SelectGroup>
                    <SelectLabel className="text-primary-text text-[12px]">
                        Status
                    </SelectLabel>
                    <SelectItem value="All" className={itemStyle}>
                        All
                    </SelectItem>
                    <SelectItem value="Backlog" className={itemStyle}>
                        Backlog
                    </SelectItem>
                    <SelectItem value="Accepted" className={itemStyle}>
                        Accepted
                    </SelectItem>
                    <SelectItem value="Rejected" className={itemStyle}>
                        Rejected
                    </SelectItem>
                    <SelectItem value="In_Progress" className={itemStyle}>
                        In Progress
                    </SelectItem>
                    <SelectItem value="Review" className={itemStyle}>
                        Review
                    </SelectItem>
                    <SelectItem value="Completed" className={itemStyle}>
                        Completed
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default StatusControl;
