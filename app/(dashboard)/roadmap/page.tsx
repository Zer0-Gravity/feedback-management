import { Category, StatusPost } from "@/app/generated/prisma/enums";
import PageWrapper from "@/components/component/PageWrapper";
import RoadmapTab from "@/components/component/RoadmapTab";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

interface RoadmapPromise {
    searchParams: Promise<{
        search?: string;
        status?: string;
        category?: string;
    }>;
}

async function Roadmap({ searchParams }: RoadmapPromise) {
    const { search = "", status = "", category = "" } = await searchParams;

    const session = await auth.api.getFullOrganization({
        headers: await headers(),
    });

    //Find the database based on the query
    const postDb = await prisma.post.findMany({
        //prettier-ignore
        where: {
            company_id: session?.id,
            AND: [
                ...(search
                    ? [{
                        OR: [
                               { title: { contains: search, mode: "insensitive" as const } },
                            ],
                          },
                      ] : []),
                 ...(status ? [{status: status as StatusPost}] : []),
                 ...(category ? [{category: category as Category}] : [])
            ],
        },
        include: { user: true, _count: { select: { upVotes: true } } },
    });

    return (
        <PageWrapper
            header="Roadmap"
            desc="See what we're working on, what's coming next, and vote on what
                matters to you."
        >
            <RoadmapTab
                database={postDb}
                search={search}
                status={status}
                category={category}
            />
        </PageWrapper>
    );
}

export default Roadmap;
