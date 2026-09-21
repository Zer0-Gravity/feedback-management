"use client";

import InputComment from "./InputComment";
import { useReply } from "@/utils/store";

function ReplyButton({
    parentId,
    postId,
}: {
    parentId: string;
    postId: string;
}) {
    const { replyId, startReply, closeReply } = useReply();
    return (
        <div>
            <button
                onClick={() => startReply(parentId)}
                className="text-[12px] text-secondary-text hover:text-primary-text transition-colors"
            >
                {replyId !== parentId && <p>Reply</p>}
            </button>

            {replyId === parentId && (
                <InputComment postId={postId} parentId={parentId}>
                    <button
                        onClick={closeReply}
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
