"use client";

import DropdownMember from "@/components/component/DropdownMember";
import PageWrapper from "@/components/component/PageWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { authClient } from "@/lib/auth-client";
import { yupResolver } from "@hookform/resolvers/yup";
import { MailOpen, PackageOpen, Search } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

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

const schema = yup
    .object({
        email: yup
            .string()
            .email("Invalid e-mail address")
            .required("E-mail can't be empty"),
    })
    .required();

function Member() {
    const [currentTag, setCurrentTag] = useState<string>("All");
    const [searchMember, setSearchMember] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [prevFilter, setPrevFilter] = useState([searchMember, currentTag]);

    const [memberDb, setMemberDb] = useState<MemberType[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    //Fetching the member list
    const fetchMembers = async () => {
        const { data, error } = await authClient.organization.listMembers();

        if (error) {
            toast.error(error.message as string);
        }

        if (!data) return;

        setMemberDb(data?.members);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMembers();
    }, []);

    //Reset the current page to 1 if user perform search pr tag filter
    if (prevFilter[0] !== searchMember || prevFilter[1] !== currentTag) {
        setPrevFilter([searchMember, currentTag]);
        setCurrentPage(1);
    }

    // Pagination and filtering Section
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

    // Sending an invitation section
    const session = authClient.useActiveOrganization(); //Get the organization ID

    const handleInviteMember = async (data: any) => {
        // Send the invitation
        const { error } = await authClient.organization.inviteMember({
            email: data.email,
            organizationId: session.data?.id,
            role: "member",
        });

        toast.success("Invitation send");

        //Throw error if exist
        if (error) {
            toast.error(error.message as string);
        }
    };

    const currentRole = authClient.useActiveMemberRole();

    return (
        <PageWrapper
            header="Member"
            desc="Manage your current organization members "
        >
            {["admin", "owner"].includes(currentRole.data?.role ?? "") && (
                <form
                    onSubmit={handleSubmit(handleInviteMember)}
                    className="flex gap-2 items-center bg-card-clr p-3 rounded-lg border-border-clr my-4 relative"
                >
                    <input
                        {...register("email")}
                        type="text"
                        className={`border border-border-clr rounded-lg bg-background-secondary h-9 w-full text-primary-text text-[12px] p-2 outline-none ${errors.email ? "border-red-500 outline-0 text-red-500" : ""}`}
                        placeholder="Invite by email - johnDoe@mail.com"
                    />

                    {errors.email && (
                        <p className="error-message absolute top-15 bg-red-500/20 p-2 rounded-full">
                            {errors.email.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="bg-accent-clr whitespace-nowrap text-white h-9 text-[14px] p-2 rounded-md"
                    >
                        <p>Send Invite</p>
                    </button>
                </form>
            )}

            <div className="flex flex-col md:flex-row gap-2 items-center mb-5">
                <div className="relative h-10 w-full md:w-200 bg-card-clr rounded-lg">
                    <input
                        type="text"
                        className="h-full w-full text-[12px] text-secondary-text py-2 pl-10"
                        placeholder="Search member..."
                        value={searchMember}
                        onChange={(e) => setSearchMember(e.target.value)}
                    />
                    <Search
                        size={12}
                        className="text-secondary-text absolute top-1/2 -translate-y-1/2 left-4"
                    />
                </div>
                <div className="flex justify-between items-center w-full">
                    <RadioGroup
                        value={currentTag}
                        onValueChange={(val) => setCurrentTag(val)}
                        className="flex gap-2"
                    >
                        {["All", "Owner", "Admin", "Member"].map(
                            (role, index) => (
                                <label
                                    key={index}
                                    className="relative text-secondary-text h-9 px-2 flex items-center justify-center border border-border-clr rounded-md has-checked:text-white transition-all"
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
                                            className="absolute inset-0 rounded-md bg-accent-clr z-1"
                                        />
                                    )}
                                    <span className="text-[12px] z-10">
                                        {role}
                                    </span>
                                </label>
                            ),
                        )}
                    </RadioGroup>

                    {/* Open invitation list */}
                    {["admin", "owner"].includes(
                        currentRole.data?.role ?? "",
                    ) && (
                        <Link
                            href={"invitation-list"}
                            className="border border-accent-clr rounded-md bg-accent-clr/10 text-accent-clr flex items-center gap-2 justify-center h-9 px-2"
                        >
                            <MailOpen size={14} />
                            <span className="text-[12px]">Invitation</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex gap-2 flex-col bg-card-clr rounded-lg p-3">
                {paginatedData.length !== 0 ? (
                    paginatedData.map((member) => (
                        <div
                            key={member.id}
                            className="flex justify-between items-center p-2 rounded-md"
                        >
                            <div className="flex gap-2 items-center text-secondary-text">
                                <Avatar className="bg-background">
                                    <AvatarImage />
                                    <AvatarFallback className="text-[10px] bg-background-secondary">
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
                                {["admin", "owner"].includes(
                                    currentRole.data?.role ?? "",
                                ) && (
                                    <DropdownMember
                                        memberId={member.id}
                                        role={member.role}
                                        name={member.user.name}
                                        onMemberUpdate={fetchMembers}
                                    />
                                )}
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
                    className="bg-accent-clr text-white text-[12px] rounded-md px-2 py-1 disabled:opacity-50"
                >
                    Prev
                </button>
                <p className="text-secondary-text">{currentPage}</p>
                <button
                    disabled={
                        currentPage === totalPages || paginatedData.length === 0
                    }
                    onClick={() => handleButton(currentPage + 1)}
                    className="bg-accent-clr text-white text-[12px] rounded-md px-2 py-1 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </PageWrapper>
    );
}

export default Member;
