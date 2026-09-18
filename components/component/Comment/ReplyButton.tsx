"use client";

import { useState } from "react";
import InputComment from "./InputComment";

function ReplyButton({
    parentId,
    postId,
}: {
    parentId: string;
    postId: string;
}) {
    const [onReply, setOnReply] = useState<string>("");

    return (
        <div>
            <button
                onClick={() => setOnReply(parentId)}
                className="text-[12px] text-secondary-text hover:text-primary-text transition-colors"
            >
                {onReply !== parentId && <p>Reply</p>}
            </button>

            {onReply === parentId && (
                <InputComment postId={postId}>
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
