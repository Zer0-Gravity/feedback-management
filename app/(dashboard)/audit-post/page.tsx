import PageWrapper from "@/components/component/PageWrapper";
import AuditTable from "./table";
import { AuditPost, columns } from "./column";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

async function Audit() {
    const postDb = await prisma.post.findMany({
        include: {
            user: { select: { name: true } },
            _count: { select: { comments: true, upVotes: true } },
        },
    });

    if (!postDb) return;

    const mappedData: AuditPost[] = postDb.map((post) => ({
        id: post.id,
        title: post.title,
        dateSubmitted: format(post.created_at, "PPPP"),
        comment: post._count.comments,
        upvote: post._count.upVotes,
        author: post.user.name,
        status: post.status,
        category: post.category,
    }));

    return (
        <PageWrapper header="Audit Post">
            <div>
                <AuditTable columns={columns} data={mappedData} />
            </div>
        </PageWrapper>
    );
}

export default Audit;
