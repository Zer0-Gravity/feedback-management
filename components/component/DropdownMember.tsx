"use client";

import { MoreHorizontal } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
} from "../ui/popover";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface MemberDropdownProps {
    memberId: string;
    role: string;
    name: string;
}

function DropdownMember({ memberId, role, name }: MemberDropdownProps) {
    const [confirmRemove, setConfirmRemove] = useState<boolean>(false);

    return (
        <Popover>
            <PopoverTrigger className="hover:bg-background-secondary h-8 w-8 grid place-content-center rounded-full transition-all">
                <MoreHorizontal size={14} className="text-secondary-text " />
            </PopoverTrigger>
            <PopoverContent
                className="bg-background-secondary max-w-65 ring-0 shadow-xl"
                align="start"
            >
                <PopoverHeader className="text-secondary-text">
                    Actions
                </PopoverHeader>

                <div className="space-y-2">
                    <Select
                        value={role.charAt(0).toUpperCase() + role.slice(1)}
                    >
                        <SelectTrigger className="w-full bg-background text-secondary-text text-[14px] border-none">
                            <SelectValue placeholder={role} />
                        </SelectTrigger>
                        <SelectContent className="bg-background ring-0 ">
                            {["owner", "admin", "member"].map((role, index) => (
                                <SelectItem
                                    key={index}
                                    value={role}
                                    className="data-selected:bg-button-clr data-selected:text-white data-highlighted:bg-background-secondary text-secondary-text"
                                >
                                    {role.charAt(0).toUpperCase() +
                                        role.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div
                        onClick={() => setConfirmRemove(true)}
                        className="text-[14px] w-full text-left rounded-md cursor-pointer"
                    >
                        {confirmRemove ? (
                            <div className="space-y-3 bg-red-500/20 p-2 rounded-md">
                                <p className="text-[12px] text-primary-text">
                                    {`Remove ${name} from this organization`}
                                </p>
                                <div className="w-full flex gap-3">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setConfirmRemove(false);
                                        }}
                                        className="p-2 rounded-md border border-secondary-text text-secondary-text flex-1 text-[12px] active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                    <button className="p-2 rounded-md bg-red-500 text-white flex-1 text-[12px] font-semibold active:scale-95">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-red-500 hover:bg-red-500/20 font-semibold p-2 rounded-md">
                                Remove Member
                            </p>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default DropdownMember;
