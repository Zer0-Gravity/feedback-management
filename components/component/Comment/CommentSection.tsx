"use client";

import { Comment, User } from "@/app/generated/prisma/client";
import InputComment from "./InputComment";
import { Dot } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

type CommentType = Comment & {
    user: User;
};

interface CommentProps {
    comments: CommentType[];
}

function CommentSection({ comments }: CommentProps) {
    const [onReply, setOnReply] = useState<string>("");

    return (
        <div className="space-y-5 mb-100">
            <InputComment />

            <div className="flex flex-col gap-2">
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback className="bg-slate-400 text-slate-600">
                                    {comment.user.name
                                        .slice(0, 1)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="w-full">
                                <div className="text-secondary-text text-[12px] font-medium flex items-center">
                                    <p>{comment.user.name}</p>
                                    <Dot className="text-secondary-text" />
                                    <p className="text-[10px]">
                                        {formatDistanceToNow(
                                            comment.created_at,
                                            {
                                                addSuffix: true,
                                            },
                                        )}
                                    </p>
                                </div>
                                <p className="text-primary-text text-[14px]">
                                    {comment.content}
                                </p>

                                <div>
                                    <button
                                        onClick={() => setOnReply(comment.id)}
                                        className="text-[12px] text-secondary-text"
                                    >
                                        Reply
                                    </button>

                                    {onReply === comment.id && (
                                        <InputComment>
                                            <button
                                                onClick={() => setOnReply("")}
                                                className="text-[12px] border border-button-clr text-button-clr px-2 py-1 rounded-full"
                                            >
                                                Cancel
                                            </button>
                                        </InputComment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
