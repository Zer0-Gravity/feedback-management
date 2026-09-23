"use client";

import PageWrapper from "@/components/component/PageWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { authClient } from "@/lib/auth-client";
import { MoreHorizontal, PackageOpen } from "lucide-react";
import { motion } from "motion/react";
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [prevFilter, setPrevFilter] = useState([searchMember, currentTag]);

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

    //Reset the current page to 1 if user perform search pr tag filter
    if (prevFilter[0] !== searchMember || prevFilter[1] !== currentTag) {
        setPrevFilter([searchMember, currentTag]);
        setCurrentPage(1);
    }

    //Filtered data
    const filteredData = memberDb.filter((data) => {
        //Filter by name
        const matchName = data.user.name
            .toLowerCase()
            .includes(searchMember.toLowerCase());

        //Filter by role
        const matchRole =
            currentTag.toLowerCase() === "all" ||
            data.role.toLowerCase().includes(currentTag.toLowerCase());

        return matchName && matchRole;
    });

    const itemPerPage = 10; //Set total item per page
    const startIndex = (currentPage - 1) * itemPerPage; //Start the page at the index 0

    //Slice the data for pagination
    const paginatedData = filteredData.slice(
        startIndex,
        startIndex + itemPerPage,
    );
    const totalPages = Math.ceil(filteredData.length / itemPerPage); //Calculate all the page needed
    const handleButton = (page: number) => setCurrentPage(page); // function to handle the button navigation

    return (
        <PageWrapper header="Member">
            <div className="flex gap-2 items-center bg-background p-3 rounded-lg border-border-clr my-4">
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

            <div className="flex gap-2 items-center">
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
                            className="relative text-secondary-text h-9 w-17 flex items-center justify-center border border-border-clr rounded-md has-checked:text-white transition-all"
                        >
                            <RadioGroupItem
                                value={role}
                                id={role.toLowerCase()}
                                className="hidden"
                            />
                            {currentTag === role && (
                                <motion.div
                                    layoutId="roles"
                                    transition={{
                                        type: "spring",
                                        damping: 30,
                                        stiffness: 280,
                                    }}
                                    className="absolute inset-0 rounded-md bg-button-clr z-1"
                                />
                            )}
                            <span className="text-[14px] z-10">{role}</span>
                        </label>
                    ))}
                </RadioGroup>
            </div>

            <div className="flex gap-2 flex-col bg-background rounded-lg p-3">
                {paginatedData.length !== 0 ? (
                    paginatedData.map((member) => (
                        <div
                            key={member.id}
                            className="flex justify-between items-center"
                        >
                            <div className="flex gap-2 items-center text-primary-text">
                                <Avatar className="bg-background">
                                    <AvatarImage />
                                    <AvatarFallback className="text-[10px]">
                                        {member.user.name
                                            .slice(0, 2)
                                            .toUpperCase()}
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
                    ))
                ) : (
                    <div className="border border-border-clr border-dashed w-full rounded-md flex items-center justify-center gap-3 text-secondary-text p-3">
                        <PackageOpen />
                        <p className="text-[14px]">
                            No available data is found
                        </p>
                    </div>
                )}
            </div>

            <div className="flex gap-3 items-center justify-end">
                <button
                    disabled={currentPage === 1 || paginatedData.length === 0}
                    onClick={() => handleButton(currentPage - 1)}
                    className="bg-button-clr text-white text-[12px] rounded-md px-2 py-1 disabled:opacity-50"
                >
                    Prev
                </button>
                <p className="text-secondary-text">{currentPage}</p>
                <button
                    disabled={
                        currentPage === totalPages || paginatedData.length === 0
                    }
                    onClick={() => handleButton(currentPage + 1)}
                    className="bg-button-clr text-white text-[12px] rounded-md px-2 py-1 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </PageWrapper>
    );
}

export default Member;
