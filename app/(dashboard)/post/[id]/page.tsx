import CommentSection from "@/components/component/Comment/CommentSection";
import PageWrapper from "@/components/component/PageWrapper";
import prisma from "@/lib/prisma";
import { STATUS_CONFIG } from "@/utils/func";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, MessageCircle, Triangle } from "lucide-react";
import { notFound } from "next/navigation";

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
    console.log(postDetailDb);

    return (
        <PageWrapper>
            <div className="flex flex-col gap-3">
                <button className="flex gap-2 items-center text-primary-text">
                    <ArrowLeft size={14} /> <span>Back</span>
                </button>

                {/* | TItle and info | */}
                <div>
                    <h1 className="text-primary-text text-[22px] font-bold">
                        {postDetailDb.title}
                    </h1>
                    <div className="flex justify-between">
                        <p className="text-secondary-text text-[12px]">{`Submitted ${formatDistanceToNow(postDetailDb.created_at, { addSuffix: true })} by ${postDetailDb.user.name}`}</p>
                        <div className="flex gap-2 items-center">
                            <p className="text-[12px] font-bold text-secondary-text">
                                Status :
                            </p>
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
                <div>
                    <p className="text-primary-text text-[14px]">
                        {postDetailDb.content}
                    </p>
                </div>

                {/* | Comment and Upvote render | */}
                <div className="flex items-center gap-5">
                    <div className="flex gap-2 items-center text-secondary-text">
                        <MessageCircle size={12} />
                        <p className="hidden md:flex text-[12px]">Comments</p>
                        <p className="text-[12px]">
                            {postDetailDb._count.comments}
                        </p>
                    </div>
                    <div className="flex gap-2 items-center text-secondary-text">
                        <Triangle size={12} />
                        <p className="hidden md:flex text-[12px]">Up votes</p>
                        <p className="text-[12px]">
                            {postDetailDb._count.upVotes}
                        </p>
                    </div>
                </div>

                {/* | Comment Section | */}

                <CommentSection />
            </div>
        </PageWrapper>
    );
}

export default PostDetail;
