"use server";

import { Category, StatusPost } from "@/app/generated/prisma/enums";
import SearchControl from "@/components/component/FilterComponent/SearchControl";
import prisma from "@/lib/prisma";
import {
    CATEGORY_CONFIG,
    STATUS_CONFIG,
    tabCategory,
    tabSort,
    tabsStatus,
} from "@/utils/func";
import { MessageCircle, PackageOpen, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import PageWrapper from "@/components/component/PageWrapper";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UpvoteButton from "@/components/component/UpvoteButton";
import Link from "next/link";
import { ContentPostInline } from "@/components/component/ContentPost";
import FeedFilter from "@/components/component/FilterComponent/FeedFilter";
import { Suspense } from "react";

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

    // Get active organization ID
    const session = await auth.api.getFullOrganization({
        headers: await headers(),
    });

    //Set the index into the variable
    const orderByList = sortMap[sort.toLowerCase()] || { created_at: "desc" };

    const postDb = await prisma.post.findMany({
        //prettier-ignore
        where: {    
            company_id: session?.id,
            AND: [
                //Find a data that match the query based on user input for bot title and content
                ...(query
                    ? [{
                        OR: [
                              { title: {contains: query, mode: "insensitive" as const} },
                              { content: {contains: query, mode: "insensitive" as const} }
                            ],
                        }] : []),
                ...(category ? [{ category: category as Category }] : []),
                ...(status ? [{status: status as StatusPost}] : [])
            ],
        },
        orderBy: orderByList,
        include: { _count: { select: { upVotes: true, comments: true } } }, //Include bot upvote and comment count
    });

    return (
        <PageWrapper
            header="Feed"
            desc=" See what other user said, discuss together and vote what you
                think is worth push"
        >
            {/* Feed controller */}
            <div className="flex flex-col gap-2 lg:flex-row md:justify-between md:items-center mb-5">
                <Suspense fallback={null}>
                    <SearchControl defVal={query} />
                </Suspense>
                <div className="flex gap-2 justify-end">
                    <Suspense fallback={null}>
                        <FeedFilter
                            filter={status}
                            placeholder="Status"
                            url="status"
                            data={tabsStatus}
                        />
                        <FeedFilter
                            filter={category}
                            placeholder="Category"
                            url="category"
                            data={tabCategory}
                        />
                        <FeedFilter
                            filter={sort}
                            placeholder="Newest"
                            url="sort"
                            data={tabSort}
                        />
                    </Suspense>
                    <Link
                        href={"/post/new"}
                        className="flex gap-2 items-center text-accent-clr text-[12px] bg-accent-clr/10 border-accent-clr border  rounded-md p-2"
                    >
                        <Pencil size={14} />
                        <p>New</p>
                    </Link>
                </div>
            </div>

            {/* Post card sections */}
            <div className="flex-1 flex min-h-0 overflow-y-auto flex-col gap-2 hide-scrollbar pb-24 ">
                {postDb.length !== 0 ? (
                    postDb.map((post) => (
                        <Link
                            href={`post/${post.id}`}
                            key={post.id}
                            className="w-full bg-card-clr p-3 rounded-lg flex flex-col-reverse md:flex-row gap-2"
                        >
                            <UpvoteButton
                                postId={post.id}
                                count={post._count.upVotes}
                            />

                            <div className="space-y-1 w-full">
                                <div className="flex gap-2 items-center">
                                    <CategoryBadge category={post.category} />
                                    <StatusBadge status={post.status} />
                                </div>

                                {/* Post Title */}
                                <h1 className="text-primary-text font-semibold">
                                    {post.title}
                                </h1>

                                {/* Post Content */}
                                <ContentPostInline
                                    content={post.content as string}
                                />

                                {/* Comment date */}
                                <div className="flex justify-between">
                                    <div className="flex gap-2 items-center text-primary-text">
                                        <MessageCircle size={12} />
                                        <div className=" text-[12px] flex gap-2 items-center">
                                            <p>{post._count.comments}</p>{" "}
                                            <p>Comment</p>
                                        </div>
                                    </div>
                                    <p className="text-primary-text text-[12px]">
                                        {formatDistanceToNow(post.created_at, {
                                            addSuffix: true,
                                        })}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex justify-center w-full p-5 mt-5 border border-border-clr rounded-md items-center gap-3">
                        <PackageOpen
                            size={20}
                            className="text-secondary-text"
                        />
                        <h1 className="text-primary-text text-[14px] p-2">
                            No submission yet, be the first one!
                        </h1>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
}

function CategoryBadge({ category }: { category: string }) {
    const currentCategory = CATEGORY_CONFIG[category.toLowerCase()];

    return (
        <div
            style={{ color: `${currentCategory.color}` }}
            className="flex gap-2 items-center"
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
