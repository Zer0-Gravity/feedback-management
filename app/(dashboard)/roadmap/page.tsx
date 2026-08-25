import RoadmapTab from "@/components/component/RoadmapTab";
import prisma from "@/lib/prisma";

async function Roadmap() {
    const postDb = await prisma.post.findMany({ include: { user: true } });

    return (
        <main className="flex justify-center h-dvh ">
            <div className="w-full md:w-[80%] p-4 flex flex-col gap-3">
                <h1 className="text-[30px] hidden md:flex text-primary-text font-bold">
                    Roadmap
                </h1>

                <div className="flex-1">
                    <RoadmapTab database={postDb} />
                </div>
            </div>
        </main>
    );
}

export default Roadmap;
