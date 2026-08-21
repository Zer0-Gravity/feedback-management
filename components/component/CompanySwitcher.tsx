"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useCompany } from "@/utils/store";
import { Company } from "@/app/generated/prisma/client";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function CompanySwitcher({ companyDb }: { companyDb: Company[] }) {
    const { companyId, setCompany } = useCompany();

    //Grab the selected company data
    const selectedCompany = companyDb.find((db) => db.id === companyId);

    return (
        <div>
            <Select
                value={companyId}
                onValueChange={(val) => setCompany(val as string)}
            >
                <SelectTrigger className="border bg-background-secondary border-border-clr p-2 h-10! md:w-50">
                    {selectedCompany ? (
                        <CompanyList
                            db={selectedCompany}
                            css="hidden md:flex flex-col text-left"
                        />
                    ) : (
                        <SelectValue placeholder="Choose company..." />
                    )}
                </SelectTrigger>

                <SelectContent
                    align="start"
                    sideOffset={20}
                    className="bg-background ring-0 border-border-clr rounded-md w-full"
                >
                    <SelectGroup>
                        <div className="space-y-2">
                            {companyDb.map((db) => (
                                <SelectItem
                                    key={db.name}
                                    value={db.id}
                                    className="hover:bg-background-secondary"
                                >
                                    <CompanyList
                                        db={db}
                                        css="flex flex-col text-left"
                                    />
                                </SelectItem>
                            ))}
                            <button className="flex hover:bg-background-secondary gap-2 items-center p-3 justify-center w-full rounded-md">
                                <Plus size={14} className="text-primary-text" />
                                <span className="text-[12px] text-primary-text md:text-[14px]">
                                    Create Organization
                                </span>
                            </button>
                        </div>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

function CompanyList({ db, css }: { db: Company; css: string }) {
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
