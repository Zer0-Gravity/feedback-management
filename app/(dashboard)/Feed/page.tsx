"use server";

import { Category, StatusPost } from "@/app/generated/prisma/enums";
import StatusControl from "@/components/component/FilterComponent/StatusControl";
import SearchControl from "@/components/component/FilterComponent/SearchControl";
import prisma from "@/lib/prisma";
import { CATEGORY_CONFIG, STATUS_CONFIG } from "@/utils/func";
import { MessageCircle, Triangle } from "lucide-react";
import CategoryControl from "@/components/component/FilterComponent/CategoryControl";
import SortControl from "@/components/component/FilterComponent/SortControl";
import { formatDistanceToNow } from "date-fns";
import PageWrapper from "@/components/component/PageWrapper";

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
        sort = "",
        status = "",
        category = "",
    } = await searchParams;

    //Map orderBy into a index selector
    const sortMap: Record<string, any> = {
        newest: { created_at: "desc" },
        oldest: { created_at: "asc" },
        title: { title: "asc" },
        popular: { upVotes: { _count: "desc" } },
    };

    //Set the index into the variable
    const orderByList = sortMap[sort.toLowerCase()] || { created_at: "desc" };

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
        orderBy: orderByList,
        include: { _count: { select: { upVotes: true, comments: true } } }, //Include bot upvote and comment count
    });

    return (
        <PageWrapper header="Feed">
            <div className="flex flex-col gap-2 lg:flex-row md:justify-between md:items-center">
                <SearchControl defVal={query} />
                <div className="flex gap-2 justify-end">
                    <StatusControl status={status} />
                    <CategoryControl category={category} />
                    <SortControl sort={sort} />
                </div>
            </div>

            {/* Post card sections */}
            <div className="flex-1 flex overflow-y-auto flex-col gap-2 hide-scrollbar">
                {postDb.map((post) => (
                    <div
                        key={post.id}
                        className="w-full h-27 bg-card-clr p-3 rounded-lg flex flex-col justify-between gap-2"
                    >
                        <div>
                            <div className="text-[14px] font-medium flex gap-3 items-center">
                                <h1 className="text-primary-text">
                                    {post.title}
                                </h1>
                                <StatusBadge status={post.status} />
                            </div>
                        </div>

                        <p className="text-secondary-text text-[12px] truncate">
                            {post.content}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="flex gap-2 items-center">
                                    <MessageCircle
                                        size={12}
                                        className="text-primary-text"
                                    />
                                    <div className="text-primary-text text-[12px] flex gap-2 items-center">
                                        <p>{post._count.comments}</p>{" "}
                                        <p className="hidden sm:flex">
                                            Comment
                                        </p>
                                    </div>
                                </div>
                                <button className="flex gap-2 items-center">
                                    <Triangle
                                        size={12}
                                        className="text-primary-text"
                                    />
                                    <div className="text-primary-text text-[12px] flex items-center gap-2">
                                        <p>{post._count.upVotes}</p>{" "}
                                        <p className="hidden sm:flex">Upvote</p>
                                    </div>
                                </button>
                                <CategoryBadge category={post.category} />
                            </div>

                            <p className="text-primary-text text-[12px]">
                                {formatDistanceToNow(post.created_at, {
                                    addSuffix: true,
                                })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
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
