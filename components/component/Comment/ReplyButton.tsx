"use client";

import { useState } from "react";
import InputComment from "./InputComment";

function ReplyButton({ commentId }: { commentId: string }) {
    const [onReply, setOnReply] = useState<string>("");

    return (
        <div>
            <button
                onClick={() => setOnReply(commentId)}
                className="text-[12px] text-secondary-text hover:text-primary-text transition-colors"
            >
                {onReply !== commentId && <p>Reply</p>}
            </button>

            {onReply === commentId && (
                <InputComment>
                    <button
                        onClick={() => setOnReply("")}
                        className="text-[12px] rounded-full text-button-clr border border-button-clr px-2 py-1"
                    >
                        Cancel
                    </button>
                </InputComment>
            )}
        </div>
    );
}

export default ReplyButton;
