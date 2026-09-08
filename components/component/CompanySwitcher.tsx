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

function CompanySwitcher({ companyDb }: { companyDb: Company[] }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="bg-background-secondary border border-border-clr w-full md:w-[200px] h-[40px] text-white rounded-md">
                <h1>Company</h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background-secondary">
                <DropdownMenuGroup>
                    {companyDb.map((company) => (
                        <DropdownMenuItem key={company.id}>
                            <CompanyList db={company} />
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function CompanyList({ db, css }: { db: Company; css?: string }) {
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
