import PageWrapper from "@/components/component/PageWrapper";
import TableData from "./table";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { columns, UserPost } from "./column";
import { format } from "date-fns";

async function Post() {
    const sessions = await auth.api.getSession({ headers: await headers() });

    //Get post database based on user ID
    const userPostDb = await prisma.post.findMany({
        where: { author_id: sessions?.user.id },
        include: {
            _count: { select: { comments: true, upVotes: true } },
            company: { select: { name: true, email: true } },
        },
    });

    //Map the data based on the column order
    const mappedPostDb: UserPost[] = userPostDb.map((post) => ({
        id: post.id,
        title: post.title,
        dateSubmitted: format(post.created_at, "PPPP"),
        comment: post._count.comments,
        upvote: post._count.upVotes,
        status: post.status,
        category: post.category,
        company: post.company.name,
        companyEmail: post.company.email,
    }));

    return (
        <PageWrapper
            header="Your Post"
            desc="Manage your own post across all the company you already join"
        >
            <div>
                <TableData columns={columns} data={mappedPostDb} />
            </div>
        </PageWrapper>
    );
}

export default Post;
