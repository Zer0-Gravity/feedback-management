"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton() {
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

export default BackButton;
