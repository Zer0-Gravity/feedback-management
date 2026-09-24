"use client";

import { checkUpvote, handleUpvote } from "@/app/(dashboard)/feed/actions";
import { Triangle } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

interface ButtonProps {
    count: number;
    postId: string;
}

function UpvoteButton({ count, postId }: ButtonProps) {
    const [voted, setVoted] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    //Get the voted value
    useEffect(() => {
        checkUpvote(postId).then((res) => setVoted(!!res));
    }, [postId]);

    return (
        <button
            disabled={isPending}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setVoted((prev) => !prev); //Optimistic toggle
                startTransition(async () => {
                    try {
                        await handleUpvote(postId);
                    } catch {
                        //Roll back if its error
                        setVoted((prev) => !prev);
                    }
                });
            }}
            className={`text-primary-text text-[12px] flex md:flex-col items-center justify-center gap-2 rounded-md p-2 ${voted ? "bg-button-clr" : "border"}`}
        >
            <Triangle size={18} className={`${voted && "fill-white"}`} />
            <p>{count}</p>
        </button>
    );
}

export default UpvoteButton;
