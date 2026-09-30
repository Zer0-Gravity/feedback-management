"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Plus } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function CompanySwitcher() {
    // Get the active data
    const { data: activeOrg } = authClient.useActiveOrganization();
    const router = useRouter();

    // Set active organization function
    const handleActiveOrg = async (id: string, slug: string) => {
        try {
            await toast.promise(
                async () => {
                    await authClient.organization.setActive({
                        organizationId: id, //Set based on the id
                        organizationSlug: slug,
                    });
                    router.refresh();
                },
                {
                    loading: "Fetching your data..",
                    success: "Data fetched",
                    error: "There is problem when fetching your data",
                },
            );
        } catch (error) {
            console.log(error);
        }
    };

    // Get organization list
    const { data: listOrg } = authClient.useListOrganizations();

    if (!listOrg) return;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-background-secondary border border-border-clr md:fit h-10 text-white rounded-md px-2">
                {activeOrg ? (
                    <div className="flex gap-2 items-center">
                        <Avatar className="size-7">
                            <AvatarImage />
                            <AvatarFallback className="bg-accent-clr">
                                {activeOrg.name.toUpperCase().slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-[14px] text-primary-text hidden md:flex">
                            {activeOrg.name}
                        </p>
                    </div>
                ) : (
                    <p className="text-[14px] text-secondary-text">
                        Organization
                    </p>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background-secondary min-w-[200px]">
                <DropdownMenuGroup className="space-y-1">
                    {listOrg.map((org) => (
                        <DropdownMenuItem
                            key={org.id}
                            className="hover:bg-background"
                            onClick={() => handleActiveOrg(org.id, org.slug)}
                        >
                            <Avatar>
                                <AvatarImage />
                                <AvatarFallback className="bg-accent-clr">
                                    <span className="font-semibold text-white">
                                        {org.name.toUpperCase().slice(0, 2)}
                                    </span>
                                </AvatarFallback>
                            </Avatar>

                            {/* | Company Description | */}
                            <div>
                                <h1 className="text-primary-text font-semibold text-[14px]">
                                    {org.name}
                                </h1>
                                <p className="text-secondary-text text-[10px]">
                                    {org.email}
                                </p>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <Link
                        href={"?new-organization=true"}
                        className="flex gap-2 items-center text-secondary-text h-10 border border-border-clr text-[12px] justify-center hover:bg-background"
                    >
                        <Plus size={12} />
                        <p>Create Organization</p>
                    </Link>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default CompanySwitcher;
