"use client";

import { Triangle } from "lucide-react";

interface ButtonProps {
    count: number;
    onChange: () => void;
}

function UpvoteButton({ count, onChange }: ButtonProps) {
    return (
        <button
            onClick={onChange}
            className="text-primary-text text-[12px] flex items-center gap-2"
        >
            <Triangle size={12} className="" />
            <p>{count}</p> <p className="hidden sm:flex">Upvote</p>
        </button>
    );
}

export default UpvoteButton;
