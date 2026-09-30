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

export async function deleteNotifications(id: string) {
    try {
        await prisma.notification.delete({ where: { id } });
    } catch (error) {
        toast.error(`An error occurred when removing notifications: ${error}`);
    }
}
