import PageWrapper from "@/components/component/PageWrapper";
import RoadmapTab from "@/components/component/RoadmapTab";
import prisma from "@/lib/prisma";

async function Roadmap() {
    const postDb = await prisma.post.findMany({ include: { user: true } });

    return (
        <PageWrapper header="Roadmap">
            <div className="flex-1">
                <RoadmapTab database={postDb} />
            </div>
        </PageWrapper>
    );
}

export default Roadmap;
