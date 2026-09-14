"use client";

import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

function Notifications() {
    return (
        <Popover>
            <PopoverTrigger className="p-2 rounded-full border border-border-clr bg-background-secondary">
                <Bell size={16} className="text-primary-text" />
            </PopoverTrigger>
            <PopoverContent className="bg-background ring-0 shadow-lg min-w-150">
                <PopoverHeader>
                    <PopoverTitle className="text-secondary-text">
                        Notifications
                    </PopoverTitle>
                </PopoverHeader>
                <div className="flax">
                    <div className="flex justify-between border border-border-clr rounded-md p-2 items-center">
                        <div>
                            <h1 className="font-bold text-primary-text">
                                Notifications title
                            </h1>
                            <p className="text-secondary-text text-[12px]">
                                Notifications message
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="border-2 rounded-md h-6.25 w-15 text-[12px] text-green-500 border-green-500 bg-green-500/20 scale-95 active:scale-95 hover:scale-100">
                                Accept
                            </button>
                            <button className="border-2 rounded-md h-6.25 w-15 text-[12px] text-red-500 border-red-500 bg-red-500/20 scale-95 active:scale-95 hover:scale-100">
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default Notifications;
