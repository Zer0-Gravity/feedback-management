"use client";

import PageWrapper from "@/components/component/PageWrapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, RefreshCcw, Search, Send } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";

function InvitationList() {
    const [currentStatus, setCurrentStatus] = useState<string>("all");

    return (
        <PageWrapper
            header="Invitation list"
            desc="Manage and track member invitation list "
        >
            <div className="space-y-3">
                <div className="flex md:justify-between item-center  flex-col md:flex-row  gap-2">
                    <div className="relative h-10  md:w-150 w-full bg-card-clr rounded-md">
                        <input
                            type="search"
                            className="h-full w-full text-[12px] text-secondary-text py-2 pl-10"
                            placeholder="Search invitation"
                        />
                        <Search
                            size={14}
                            className="absolute top-1/2 -translate-y-1/2 left-4 text-secondary-text"
                        />
                    </div>
                    <RadioGroup
                        value={currentStatus}
                        onValueChange={(val) => setCurrentStatus(val)}
                        className="flex gap-2 md:w-fit w-full"
                    >
                        {["all", "pending", "rejected", "accepted"].map(
                            (status, index) => (
                                <label
                                    key={index}
                                    className="group relative h-10 px-2 flex items-center justify-center text-secondary-text border border-border-clr rounded-md has-checked:text-white transition-colors"
                                >
                                    <RadioGroupItem
                                        value={status}
                                        className="hidden"
                                    />
                                    <span className="text-[12px] z-10 group-checked:font-semibold">
                                        {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                    </span>

                                    {currentStatus === status && (
                                        <motion.div
                                            layoutId="inv-status"
                                            transition={{
                                                type: "spring",
                                                damping: 30,
                                                stiffness: 280,
                                            }}
                                            className="absolute inset-0 bg-accent-clr rounded-md z-4"
                                        />
                                    )}
                                </label>
                            ),
                        )}
                    </RadioGroup>
                </div>

                {/* Card list */}

                <div className="">
                    <div className="flex flex-col gap-3 p-2 bg-card-clr rounded-md">
                        {/* Main content card */}
                        <div className="flex justify-between items-center w-full">
                            <div className="flex gap-2 items-center">
                                <Mail size={20} className="text-primary-text" />
                                <div className="flex flex-col gap-2">
                                    <p className="text-[14px] font-semibold text-primary-text">
                                        Yanagi@mail.com
                                    </p>
                                    <div className="flex gap-6 items-center">
                                        <p className="text-secondary-text text-[12px]">
                                            Invited by:
                                            <span className="text-primary-text font-medium">
                                                {" "}
                                                Miyabi
                                            </span>
                                        </p>
                                        <p className="text-secondary-text text-[12px]">{`Date: 25-736-43`}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 bg-accent-clr/10 py-1.5 px-3 rounded-full">
                                <div className="h-2 w-2 rounded-full bg-accent-clr" />
                                <p className="text-[12px] text-accent-clr">
                                    Accepted
                                </p>
                            </div>
                        </div>

                        {/* Action section */}
                        <div className="flex justify-end">
                            <button className="bg-accent-clr text-white text-[12px] p-2 rounded-md flex gap-2 items-center">
                                <Send size={14} />
                                <span>Resend</span>
                            </button>
                            
                            <button className="bg-accent-clr text-white text-[12px] p-2 rounded-md flex gap-2 items-center">
                                <RefreshCcw size={14} />
                                <span>Invite Again</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export default InvitationList;
