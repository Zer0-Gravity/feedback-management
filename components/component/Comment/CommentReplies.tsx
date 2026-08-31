import { Comment, User } from "@/app/generated/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Dot } from "lucide-react";

type RepliesProps = Comment & { user: User };

interface Replies {
    replies: RepliesProps;
}

function CommentReplies({ replies }: Replies) {
    return (
        <div key={replies.id} className="flex gap-2">
            <Avatar>
                <AvatarImage />
                <AvatarFallback className="bg-slate-400 text-slate-600">
                    {replies.user.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="w-full">
                <div className="text-secondary-text text-[12px] font-medium flex items-center">
                    <p>{replies.user.name}</p>
                    <Dot className="text-secondary-text" />
                    <p className="text-[10px]">
                        {formatDistanceToNow(replies.created_at, {
                            addSuffix: true,
                        })}
                    </p>
                </div>
                <p className="text-primary-text text-[14px]">
                    {replies.content}
                </p>
            </div>
        </div>
    );
}

export default CommentReplies;
