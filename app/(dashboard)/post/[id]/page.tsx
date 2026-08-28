import PageDetail from "@/components/component/PageDetail";
import PageWrapper from "@/components/component/PageWrapper";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PostDetail {
    params: Promise<{ id: string }>;
}

async function PostDetail({ params }: PostDetail) {
    const { id } = await params;

    const postDetailDb = await prisma.post.findUnique({ where: { id } });

    if (!postDetailDb) {
        notFound();
    }

    return (
        <PageWrapper>
            <PageDetail postDb={postDetailDb} />
        </PageWrapper>
    );
}

export default PostDetail;
