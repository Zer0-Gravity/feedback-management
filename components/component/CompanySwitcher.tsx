"use client";

import { Company } from "@/app/generated/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Plus } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

function CompanySwitcher({ companyDb }: { companyDb: Company[] }) {
    const { data: activeOrg } = authClient.useActiveOrganization();

    // Set active organization function
    const handleActiveOrg = async (id: string, slug: string) => {
        try {
            await authClient.organization.setActive({
                organizationId: id, //Set based on the id
                organizationSlug: slug,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-background-secondary border border-border-clr w-full md:w-50 h-10 text-white rounded-md">
                {activeOrg ? (
                    <div>
                        <p>{activeOrg.name}</p>
                    </div>
                ) : (
                    <p>Company</p>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background-secondary">
                <DropdownMenuGroup className="space-y-1">
                    {companyDb.map((company) => (
                        <DropdownMenuItem
                            key={company.id}
                            className="hover:bg-background"
                            onClick={() =>
                                handleActiveOrg(company.id, company.slug)
                            }
                        >
                            <CompanyList db={company} />
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

function CompanyList({ db, css }: { db: any; css?: string }) {
    return (
        <div className="flex gap-2 items-center">
            <Avatar>
                <AvatarImage />
                <AvatarFallback className="bg-button-clr">
                    <span className="font-semibold text-white">
                        {db.name.slice(0, 2)}
                    </span>
                </AvatarFallback>
            </Avatar>

            {/* | Company Description | */}
            <div className={css}>
                <h1 className="text-primary-text font-semibold text-[14px]">
                    {db.name}
                </h1>
                <p className="text-secondary-text text-[10px]">{db.email}</p>
            </div>
        </div>
    );
}

export default CompanySwitcher;
