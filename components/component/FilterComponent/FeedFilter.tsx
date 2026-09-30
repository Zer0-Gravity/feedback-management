"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterProps {
    filter: string;
    placeholder: string;
    url: string;
    data: Data[];
}

interface Data {
    label: string;
    value: string;
    color?: string;
}

function FeedFilter({ filter, url, data, placeholder }: FilterProps) {
    const router = useRouter();
    const pathname = usePathname();
    const statusParams = useSearchParams();

    const handleFilter = (filter: string) => {
        const params = new URLSearchParams(statusParams);

        //Check if user choose all then the url param get deleted
        if (filter === "All") {
            params.delete(`${url}`);
        } else {
            params.set(`${url}`, filter);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select
            value={filter}
            onValueChange={(val) => handleFilter(val as string)}
        >
            <SelectTrigger className="bg-card-clr border border-border-clr w-full text-secondary-text">
                <SelectValue
                    placeholder={placeholder}
                    className="text-[12px]"
                />
            </SelectTrigger>

            <SelectContent align="end" className="bg-card-clr ring-0">
                <SelectGroup>
                    {data.map((status, index) => (
                        <SelectItem
                            key={index}
                            value={status.value}
                            className="text-[12px] border border-border-clr text-secondary-text data-highlighted:text-primary-text data-highlighted:bg-accent-clr/10 data-highlighted:border-accent-clr data-selected:bg-accent-clr/10 data-selected:border-accent-clr data-selected:text-primary-text"
                        >
                            {status.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default FeedFilter;
