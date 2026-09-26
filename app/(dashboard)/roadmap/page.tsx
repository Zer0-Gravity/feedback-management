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
            ],
        },
        include: { user: true, _count: { select: { upVotes: true } } },
    });

    return (
        <PageWrapper header="Roadmap">
            <p className="text-secondary-text text-[12px]">
                See what we&apos;re working on, what&apos;s coming next, and
                vote on what matters to you.
            </p>
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
