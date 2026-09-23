"use client";

import PageWrapper from "@/components/component/PageWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { authClient } from "@/lib/auth-client";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface MemberType {
    id: string;
    organizationId: string;
    role: "member" | "admin" | "owner";
    createdAt: Date;
    userId: string;
    user: {
        id: string;
        email: string;
        name: string;
        image?: string | undefined;
    };
}

function Member() {
    const [userEmail, setUserEmail] = useState<string>("");
    const [currentTag, setCurrentTag] = useState<string>("All");
    const [searchMember, setSearchMember] = useState<string>("");

    const [memberDb, setMemberDb] = useState<MemberType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await authClient.organization.listMembers();

            if (error) {
                toast.error(error.message as string);
            }

            if (!data) return;

            setMemberDb(data?.members);
            console.log(data);
        };

        fetchData();
    }, []);

    return (
        <PageWrapper header="Member">
            <div className="flex gap-2 items-center bg-background p-3 rounded-lg border-border-clr">
                <input
                    type="text"
                    className="border border-border-clr rounded-lg bg-background h-9 w-full text-primary-text text-[12px] p-2"
                    placeholder="Invite by email - johnDoe@mail.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />

                <button className="bg-button-clr whitespace-nowrap text-white h-9 text-[14px] p-2 rounded-md">
                    <p>Send Invite</p>
                </button>
            </div>

            <div className="flex gap-2 ">
                <input
                    type="text"
                    className="border border-border-clr rounded-lg bg-background h-9 w-full text-primary-text text-[12px] p-2"
                    placeholder="Search member..."
                    value={searchMember}
                    onChange={(e) => setSearchMember(e.target.value)}
                />
                <RadioGroup
                    value={currentTag}
                    onValueChange={(val) => setCurrentTag(val)}
                    className="flex gap-2"
                >
                    {["All", "Owner", "Admin", "Member"].map((role, index) => (
                        <label
                            key={index}
                            className="flex item-center rounded-md h-9 p-2 border border-border-clr text-secondary-text has-checked:bg-button-clr has-checked:text-white"
                        >
                            <RadioGroupItem
                                value={role}
                                id={role.toLowerCase()}
                                className="hidden"
                            />
                            <span className="text-[14px]">{role}</span>
                        </label>
                    ))}
                </RadioGroup>
            </div>

            <div className="flex gap-2 flex-col bg-background rounded-lg p-3">
                {memberDb.map((member) => (
                    <div
                        key={member.id}
                        className="flex justify-between items-center"
                    >
                        <div className="flex gap-2 items-center text-primary-text">
                            <Avatar className="bg-background">
                                <AvatarImage />
                                <AvatarFallback className="text-[10px]">
                                    {member.user.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <h1 className="font-bold text-primary-text text-[14px]">
                                    {member.user.name}
                                </h1>
                                <p className="text-secondary-text text-[12px]">
                                    {member.user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="border w-16 h-6 flex items-center justify-center rounded-full text-secondary-text ">
                                <p className="text-[12px]">
                                    {member.role.charAt(0).toUpperCase() +
                                        member.role.slice(1)}
                                </p>
                            </div>
                            <button className="hover:bg-background-secondary h-8 w-8 grid place-content-center rounded-full transition-all">
                                <MoreHorizontal
                                    size={14}
                                    className="text-secondary-text "
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
}

export default Member;
