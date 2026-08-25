import PageWrapper from "@/components/component/PageWrapper";
import TableData from "./table";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { columns } from "./column";

async function Post() {
    const sessions = await auth.api.getSession({ headers: await headers() });
    const userPostDb = await prisma.post.findMany({
        where: { author_id: sessions?.user.id },
    });

    return (
        <PageWrapper>
            <h1 className="text-[30px] font-bold text-primary-text">
                Your post
            </h1>

            <div>
                <TableData columns={columns} data={userPostDb} />
            </div>
        </PageWrapper>
    );
}

export default Post;
