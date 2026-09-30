"use client";

import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, BellDot, Loader2 } from "lucide-react";

import { deleteNotifications, notificationDbs } from "./actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface NotificationsItems {
    id: string;
    userId: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    invitationId: string;
}

function Notifications() {
    const router = useRouter();

    const [notifications, setNotifications] = useState<NotificationsItems[]>(
        [],
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    async function acceptInvitation(
        invitationId: string,
        notificationId: string,
    ) {
        const { error } = await authClient.organization.acceptInvitation({
            invitationId: invitationId,
        });

        if (error) {
            toast.error(error.message as string);
            return;
        }

        deleteNotifications(notificationId);
        router.refresh();
    }

    async function rejectInvitation(
        invitationId: string,
        notificationId: string,
    ) {
        const { error } = await authClient.organization.rejectInvitation({
            invitationId: invitationId,
        });

        if (error) {
            toast.error(error.message as string);
            return;
        }

        deleteNotifications(notificationId);
        router.refresh();
    }

    useEffect(() => {
        async function loadNotifications() {
            const data = await notificationDbs();

            if (data) {
                setNotifications(data);
            }

            setIsLoading(false);
        }

        loadNotifications();
    }, []);

    return (
        <Popover>
            <PopoverTrigger className="p-2 rounded-full border border-border-clr bg-background-secondary">
                {notifications.length === 0 ? (
                    <Bell size={16} className="text-primary-text" />
                ) : (
                    <BellDot size={16} className="text-primary-text" />
                )}
            </PopoverTrigger>
            <PopoverContent className="bg-background ring-0 shadow-lg min-w-150">
                <PopoverHeader>
                    <PopoverTitle className="text-secondary-text">
                        Notifications
                    </PopoverTitle>
                </PopoverHeader>
                <div className="flex flex-col gap-2">
                    {isLoading && (
                        <div className="flex gap-2 items-center justify-center p-4 w-full">
                            <Loader2 className="animate-spin" size={14} />
                            <p>Loading...</p>
                        </div>
                    )}

                    {notifications.length !== 0 ? (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex justify-between border border-border-clr rounded-md p-2 items-center w-full"
                            >
                                <div>
                                    <h1 className="font-bold text-primary-text">
                                        {notification.title}
                                    </h1>
                                    <p className="text-secondary-text text-[12px]">
                                        {notification.message}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            acceptInvitation(
                                                notification.invitationId,
                                                notification.id,
                                            )
                                        }
                                        className="border-2 rounded-md h-6.25 w-15 text-[12px] text-green-500 border-green-500 bg-green-500/20 scale-95 active:scale-95 hover:scale-100"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() =>
                                            rejectInvitation(
                                                notification.invitationId,
                                                notification.id,
                                            )
                                        }
                                        className="border-2 rounded-md h-6.25 w-15 text-[12px] text-red-500 border-red-500 bg-red-500/20 scale-95 active:scale-95 hover:scale-100"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center p-4 w-full">
                            <h1 className="text-secondary-text font-semibold text-[12px]">
                                No notifications
                            </h1>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default Notifications;
