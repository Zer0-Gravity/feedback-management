"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchControl({ defVal }: { defVal: string | undefined }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("query", value);

        //Update url
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <input
                type="text"
                value={defVal}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-12 w-full bg-background sm:w-75 border border-border-clr rounded-md p-3 text-primary-text text-[14px]"
                placeholder="Search post.."
            />
        </div>
    );
}

export default SearchControl;
