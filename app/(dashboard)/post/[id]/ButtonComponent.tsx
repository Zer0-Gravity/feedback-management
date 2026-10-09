"use client";

import { ArrowLeft, Triangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { checkUpvote, handleUpvote } from "../../feed/actions";

export function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex gap-2 items-center text-primary-text cursor-pointer"
        >
            <ArrowLeft size={14} /> <span className="text-[12px]">Back</span>
        </button>
    );
}

export function Upvote({ count, post_id }: { count: number; post_id: string }) {
    const [voted, setVoted] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    //Get the voted value
    useEffect(() => {
        checkUpvote(post_id).then((res) => setVoted(!!res));
    }, [post_id]);

    return (
        <button
            disabled={isPending}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setVoted((prev) => !prev); //Optimistic toggle
                startTransition(async () => {
                    try {
                        await handleUpvote(post_id);
                    } catch {
                        //Roll back if its error
                        setVoted((prev) => !prev);
                    }
                });
            }}
            className={`flex gap-2 items-center cursor-pointer ${voted ? "text-accent-clr" : "text-secondary-text"}`}
        >
            <Triangle
                size={12}
                className={`${voted ? "fill-accent-clr" : ""}`}
            />
            <p className="text-[12px]">{`${count} Votes`}</p>
        </button>
    );
}
