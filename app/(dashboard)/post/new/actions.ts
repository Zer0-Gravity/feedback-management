"use server";

import prisma from "@/lib/prisma";
import { FormData } from "./form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Category } from "@/app/generated/prisma/client";

export async function addPost(data: FormData, orgId: string) {
    const session = await auth.api.getSession({ headers: await headers() }); //Get author id
    const {} = await prisma.post.create({
        data: {
            author_id: session?.user.id as string,
            company_id: orgId,
            title: data.title,
            content: data.content,
            category: data.category as Category,
        },
    });
}
