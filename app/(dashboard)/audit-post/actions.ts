"use server";

import { StatusPost } from "@/app/generated/prisma/enums";
import prisma from "@/lib/prisma";

export async function updateStatusPost(val: StatusPost, id: string) {
    await prisma.post.update({
        where: { id },
        data: { status: val, updated_at: new Date() },
    });
}
