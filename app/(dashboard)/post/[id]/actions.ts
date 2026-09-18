"use server";

import { CommentProps } from "@/components/component/Comment/InputComment";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function addComment(data: CommentProps, post_id: string) {
    const session = await auth.api.getSession({ headers: await headers() }); //Get author id
    await prisma.comment.create({
        data: {
            author_id: session?.user.id as string,
            post_id: post_id,
            content: data.content,
        },
    });
}
