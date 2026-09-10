"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

//Upvote function
export async function handleUpvote(post_id: string) {
    const session = await auth.api.getSession({ headers: await headers() });

    //Get the voted data
    const isVoted = await prisma.upVote.findUnique({
        where: {
            user_id_post_id: {
                user_id: session?.user.id as string,
                post_id,
            },
        },
    });

    //Check if user already upvote and perform delete, if not upvoted create new entry
    if (isVoted) {
        await prisma.upVote.delete({
            where: {
                user_id_post_id: {
                    user_id: session?.user.id as string,
                    post_id,
                },
            },
        });
    } else {
        await prisma.upVote.create({
            data: { user_id: session?.user.id as string, post_id },
        });
    }

    //Refresh the page
    revalidatePath("/feed");

    return { isVoted };
}
