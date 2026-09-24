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
            className="text-primary-text flex md:flex-col items-center justify-center gap-2 rounded-md p-2 border"
        >
            <Triangle size={18} />
            <p className="text-[12px] font-semibold">{count}</p>
        </button>
    );
}

export default UpvoteButton;
