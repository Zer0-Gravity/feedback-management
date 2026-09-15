"use server";

import prisma from "@/lib/prisma";
import toast from "react-hot-toast";

export async function notificationDbs() {
    try {
        const dbData = await prisma.notification.findMany();
        return dbData;
    } catch (error) {
        toast.error(`An error occurred when fetching notification: ${error}`);
    }
}
