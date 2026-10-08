import CommentSection from "@/components/component/Comment/CommentSection";
import PageWrapper from "@/components/component/PageWrapper";
import prisma from "@/lib/prisma";
import { STATUS_CONFIG } from "@/utils/func";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, MessageCircle, Triangle } from "lucide-react";
import { notFound } from "next/navigation";
import { ContentPost } from "@/components/component/ContentPost";
import BackButton from "./BackButton";

interface PostDetail {
    params: Promise<{ id: string }>;
}

async function PostDetail({ params }: PostDetail) {
    const { id } = await params;

    const postDetailDb = await prisma.post.findUnique({
        where: { id },
        include: {
            user: true,
            _count: { select: { comments: true, upVotes: true } },
        },
    });

    if (!postDetailDb) {
        notFound();
    }

    const status = STATUS_CONFIG[postDetailDb.status.toLowerCase()];

    return (
        <PageWrapper>
            <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-y-auto hide-scrollbar">
                <BackButton />

                {/* | TItle and info | */}
                <div>
                    <h1 className="text-primary-text text-[20px] md:text-[22px] font-bold">
                        {postDetailDb.title}
                    </h1>
                    <div className="flex justify-between">
                        <p className="text-secondary-text text-[12px]">{`Submitted ${formatDistanceToNow(postDetailDb.created_at, { addSuffix: true })} by ${postDetailDb.user.name}`}</p>
                        <div className="flex gap-2 items-center">
                            <div
                                style={{ backgroundColor: `${status.color}` }}
                                className="h-2 w-2 rounded-full"
                            />
                            <p className="text-[12px] font-bold text-secondary-text">
                                {status.label}
                            </p>
                        </div>
                    </div>
                </div>

                {/* | Content | */}
                <div className="mb-5">
                    <ContentPost content={postDetailDb.content as string} />
                </div>

                {/* | Comment and Upvote render | */}
                <div className="flex items-center gap-5">
                    <div className="flex gap-2 items-center text-secondary-text">
                        <MessageCircle size={12} />
                        <p className="text-[12px]">{`${postDetailDb._count.comments} Comments`}</p>
                    </div>
                    <div className="flex gap-2 items-center text-secondary-text">
                        <Triangle size={12} />
                        <p className="text-[12px]">{`${postDetailDb._count.upVotes} Votes`}</p>
                    </div>
                </div>

                {/* | Comment Section | */}

                <CommentSection postId={postDetailDb.id} />
            </div>
        </PageWrapper>
    );
}

export default PostDetail;
