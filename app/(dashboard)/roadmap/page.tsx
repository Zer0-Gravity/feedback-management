import PageWrapper from "@/components/component/PageWrapper";
import RoadmapTab from "@/components/component/RoadmapTab";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

async function Roadmap() {
    const session = await auth.api.getFullOrganization({
        headers: await headers(),
    });

    const postDb = await prisma.post.findMany({
        where: { company_id: session?.id },
        include: { user: true },
    });

    return (
        <PageWrapper header="Roadmap">
            <p className="text-secondary-text text-[12px]">
                See what we&apos;re working on, what&apos;s coming next, and
                vote on what matters to you.
            </p>
            <RoadmapTab database={postDb} />
        </PageWrapper>
    );
}

export default Roadmap;
