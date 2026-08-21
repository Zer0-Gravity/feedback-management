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

function CompanySwitcher({ companyDb }: { companyDb: Company[] }) {
    const { companyId, setCompany } = useCompany();

    //Grab the selected company data
    const selectedCompany = companyDb.find((db) => db.id === companyId);

    return (
        <div className="mb-20">
            <Select
                value={companyId}
                onValueChange={(val) => setCompany(val as string)}
            >
                <SelectTrigger className="border-2 border-border-clr w-full p-2 h-15!">
                    {selectedCompany ? (
                        <div className="flex bg-background gap-2 items-center">
                            <CompanyList db={selectedCompany} />
                        </div>
                    ) : (
                        <SelectValue placeholder="Choose company..." />
                    )}
                </SelectTrigger>

                <SelectContent
                    align="start"
                    sideOffset={20}
                    className="bg-background ring-0 border-border-clr rounded-md"
                >
                    <SelectGroup>
                        <div className="space-y-2">
                            {companyDb.map((db) => (
                                <SelectItem
                                    key={db.name}
                                    value={db.id}
                                    className="hover:bg-slate-200"
                                >
                                    <CompanyList db={db} />
                                </SelectItem>
                            ))}
                            <button className="flex hover:bg-slate-200 gap-2 items-center p-3 justify-center w-full rounded-md">
                                <Plus size={14} />
                                <span className="text-[14px]">
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

function CompanyList({ db }: { db: Company }) {
    return (
        <div className="flex gap-2 items-center">
            <div className="h-10 w-10 bg-button-clr text-white flex items-center justify-center rounded-lg">
                <span className="text-[16px] font-bold">
                    {db.name.slice(0, 2).toUpperCase()}
                </span>
            </div>
            <div className="md:flex flex-col text-left hidden">
                <h1 className="text-[16px] font-bold text-primary-text">
                    {db.name}
                </h1>
                <p className="text-[12px] text-secondary-text-text">
                    {db.email}
                </p>
            </div>
        </div>
    );
}

export default CompanySwitcher;
