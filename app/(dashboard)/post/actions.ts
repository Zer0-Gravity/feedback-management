"use server";

import prisma from "@/lib/prisma";

export async function DeletePost(idToDelete: string[]) {
    try {
        await prisma.post.deleteMany({
            where: { id: { in: idToDelete } },
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }

    return { success: true };
}
