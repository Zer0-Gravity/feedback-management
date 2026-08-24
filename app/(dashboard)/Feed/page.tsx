"use server";

import { Category } from "@/app/generated/prisma/enums";
import SearchControl from "@/components/component/FeedComponent/SearchControl";
import prisma from "@/lib/prisma";
import {
    Blocks,
    Bug,
    Dot,
    MessageCircle,
    Triangle,
    WandSparkles,
} from "lucide-react";

type PageProps = {
    searchParams: Promise<{
        query?: string;
        status?: string;
        category?: Category;
        sort?: string;
    }>;
};

async function Feed({ searchParams }: PageProps) {
    const {
        query = "",
        sort = "newest",
        status,
        category,
    } = await searchParams;

    const postDb = await prisma.post.findMany({
        //prettier-ignore
        where: {
            AND: [
                ...(query
                    ? [{
                        OR: [
                              { title: {contains: query, mode: "insensitive" as const} },
                              { content: {contains: query, mode: "insensitive" as const} }
                            ],
                        }] : []),
                ...(category ? [{ category }] : []),
            ],
        },
        include: { _count: { select: { upVotes: true, comments: true } } },
    });

    return (
        <main className="flex justify-center h-screen">
            <div className="w-full md:w-[80%] p-4 flex flex-col gap-3">
                <h1 className="hidden md:flex text-[30px] text-primary-text font-bold">
                    Feed
                </h1>

                <div>
                    <SearchControl defVal={query} />
                </div>

                <div className="flex-1 flex overflow-y-auto flex-col gap-2 hide-scrollbar">
                    {postDb.map((post) => (
                        <div
                            key={post.id}
                            className="w-full h-27 bg-card-clr p-3 rounded-lg flex flex-col justify-between gap-2"
                        >
                            <h1 className="text-[14px] font-medium flex gap-3 items-center">
                                <span className="text-primary-text">
                                    {post.title}
                                </span>
                                <span className="text-primary-text text-[10px] p-1">
                                    {post.status.replace("_", " ")}
                                </span>
                            </h1>

                            <p className="text-secondary-text text-[12px] truncate">
                                {post.content}
                            </p>

                            <div className="flex items-center gap-5">
                                <p className="flex gap-2 items-center">
                                    <MessageCircle
                                        size={12}
                                        className="text-primary-text"
                                    />
                                    <span className="text-primary-text text-[12px]">
                                        {post._count.comments} Comments
                                    </span>
                                </p>
                                <button className="flex gap-2 items-center">
                                    <Triangle
                                        size={12}
                                        className="text-primary-text"
                                    />
                                    <span className="text-primary-text text-[12px]">
                                        {post._count.upVotes} Upvote
                                    </span>
                                </button>
                                <CategoryBadge category={post.category} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

function CategoryBadge({ category }: { category: string }) {
    return (
        <div
            className={`px-2 py-1 rounded-full flex gap-2 items-center ${category === "Feature_Request" && "text-button-clr"} ${category === "Integration" && "text-[#6A00FF]"} ${category === "Bug_Report" && "text-[#FB00FF]"}`}
        >
            {category === "Feature_Request" && (
                <WandSparkles size={12} className="text-button-clr" />
            )}

            {category === "Integration" && (
                <Blocks size={12} className="text-[#6A00FF]" />
            )}

            {category === "Bug_Report" && (
                <Bug size={12} className="text-[#FB00FF]]" />
            )}

            <p className="text-[12px]">{category.replace("_", " ")}</p>
        </div>
    );
}

export default Feed;
