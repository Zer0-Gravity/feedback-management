"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function SearchControl({ defVal }: { defVal: string | undefined }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    //Local state input
    const [value, setValue] = useState<string>(defVal ?? "");

    useEffect(() => {
        //Skip url matches
        if (value === (searchParams.get("query") ?? "")) return;

        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            //Check if the value not empty, then set the url
            if (value) {
                params.set("query", value);
            } else {
                params.delete("query");
            }
            //Update url
            router.push(`${pathname}?${params.toString()}`);
        }, 400);

        //Cleanup the previous timer on every key stroke
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="h-10 w-full bg-card-clr sm:w-75 border border-border-clr rounded-md p-3 text-primary-text text-[12px]"
                placeholder="Search post.."
            />
        </div>
    );
}

export default SearchControl;
