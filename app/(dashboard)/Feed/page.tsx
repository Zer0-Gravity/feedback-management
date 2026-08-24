"use server";

import { Category, StatusPost } from "@/app/generated/prisma/enums";
import StatusControl from "@/components/component/FilterComponent/StatusControl";
import SearchControl from "@/components/component/FilterComponent/SearchControl";
import prisma from "@/lib/prisma";
import { CATEGORY_CONFIG, STATUS_CONFIG } from "@/utils/func";
import { MessageCircle, Triangle } from "lucide-react";
import CategoryControl from "@/components/component/FilterComponent/CategoryControl";

type PageProps = {
    searchParams: Promise<{
        query?: string;
        status?: StatusPost;
        category?: Category;
        sort?: string;
    }>;
};

async function Feed({ searchParams }: PageProps) {
    const {
        query = "",
        sort = "newest",
        status = "",
        category = "",
    } = await searchParams;

    const postDb = await prisma.post.findMany({
        //prettier-ignore
        where: {
            AND: [
                //Find a data that match the query based on user input for bot title and content
                ...(query
                    ? [{
                        OR: [
                              { title: {contains: query, mode: "insensitive" as const} },
                              { content: {contains: query, mode: "insensitive" as const} }
                            ],
                        }] : []),
                ...(category ? [{ category }] : []),
                ...(status ? [{status}] : [])
            ],
        },
        include: { _count: { select: { upVotes: true, comments: true } } }, //Include bot upvote and comment count
    });

    return (
        <main className="flex justify-center h-screen">
            <div className="w-full md:w-[80%] p-4 flex flex-col gap-3">
                <h1 className="hidden md:flex text-[30px] text-primary-text font-bold">
                    Feed
                </h1>

                <div className="flex flex-col md:flex-row md:justify-between items-center">
                    <SearchControl defVal={query} />
                    <div className="flex gap-2">
                        <StatusControl status={status} />
                        <CategoryControl category={category} />
                    </div>
                </div>

                {/* Post card sections */}
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
                                <StatusBadge status={post.status} />
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
    const currentCategory = CATEGORY_CONFIG[category.toLowerCase()];

    return (
        <div
            style={{ color: `${currentCategory.color}` }}
            className="px-2 py-1 rounded-full flex gap-2 items-center"
        >
            <currentCategory.icon size={12} />
            <p className="text-[12px]">{currentCategory.label}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const currentStatus = STATUS_CONFIG[status.toLowerCase()];

    return (
        <div
            style={{
                backgroundColor: `${currentStatus.color}`,
            }}
            className="text-[10px] p-0.5 rounded-full px-2 py-0.5"
        >
            <p className="text-white">{currentStatus.label}</p>
        </div>
    );
}

export default Feed;
