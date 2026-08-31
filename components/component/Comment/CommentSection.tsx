import InputComment from "./InputComment";
import { Dot } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/lib/prisma";

async function CommentSection({ postId }: { postId: string }) {
    const commentsDb = await prisma.comment.findMany({
        where: { post_id: postId, parent_id: null },
        include: { user: true, replies: { include: { user: true } } },
    });

    return (
        <div className="space-y-5 mb-100">
            <InputComment />

            <div className="flex flex-col gap-2">
                {commentsDb.map((comment) => (
                    <div key={comment.id}>
                        <div className="flex gap-2">
                            {/* | Avatar Image |  */}
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback className="bg-slate-400 text-slate-600">
                                    {comment.user.name
                                        .slice(0, 1)
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            {/* | Comment Body |  */}
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

                                {/* | Reply button | */}
                                <button className="text-[12px] text-secondary-text">
                                    Reply
                                </button>

                                {/* | Comment Replies | */}
                                {comment.replies &&
                                    comment.replies.length > 0 && (
                                        <div className="pl-5 flex-col flex gap-2 my-3">
                                            {comment.replies.map((replies) => (
                                                <div
                                                    key={replies.id}
                                                    className="flex gap-2"
                                                >
                                                    <Avatar>
                                                        <AvatarImage />
                                                        <AvatarFallback className="bg-slate-400 text-slate-600">
                                                            {replies.user.name
                                                                .slice(0, 1)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="w-full">
                                                        <div className="text-secondary-text text-[12px] font-medium flex items-center">
                                                            <p>
                                                                {
                                                                    replies.user
                                                                        .name
                                                                }
                                                            </p>
                                                            <Dot className="text-secondary-text" />
                                                            <p className="text-[10px]">
                                                                {formatDistanceToNow(
                                                                    replies.created_at,
                                                                    {
                                                                        addSuffix: true,
                                                                    },
                                                                )}
                                                            </p>
                                                        </div>
                                                        <p className="text-primary-text text-[14px]">
                                                            {replies.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;
