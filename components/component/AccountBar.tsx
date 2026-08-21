"use server";

import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronUp, LogOut, Settings } from "lucide-react";
import { headers } from "next/headers";

export default async function AccountBar() {
    //Get the user session to display user detail
    const session = await auth.api.getSession({ headers: await headers() });

    return (
        <div className="border p-2 flex justify-between rounded-md border-border-clr">
            <div className="flex gap-2 items-center">
                <Avatar>
                    <AvatarImage src={session?.user.image as string} />
                    <AvatarFallback className="bg-secondary-text text-white">
                        {session?.user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-primary-text font-bold">
                        {session?.user.name}
                    </h1>
                    <p className="text-[12px] text-secondary-text">
                        {session?.user.email}
                    </p>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <ChevronUp size={20} className="text-primary-text" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background ring-0">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-[12px]!">
                            Account
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="p-2 group hover:bg-secondary-text">
                            <Settings size={20} className="text-primary-text" />
                            <span className="text-[14px]! text-primary-text">
                                Settings
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 group hover:bg-red-500 bg-red-200 transition-all">
                            <LogOut
                                size={20}
                                className="text-red-500 group-hover:text-white"
                            />
                            <span className="text-[14px]! text-red-500 font-medium group-hover:text-white">
                                Log Out
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
