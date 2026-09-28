"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(idToDelete: string[]) {
    try {
        await prisma.post.deleteMany({
            where: { id: { in: idToDelete } },
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }

    revalidatePath("/post");
    revalidatePath("/audit-post");
}
