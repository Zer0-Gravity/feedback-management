"use client";

import { LogOut, Save } from "lucide-react";

function AccountPage() {
    return (
        <div className="h-full flex flex-col gap-2 w-full md:w-[50%]">
            <div className="space-y-3 p-3 border border-border-clr rounded-lg bg-card-clr">
                <p className="text-secondary-text text-[14px] font-semibold">
                    Username
                </p>
                <input
                    type="text"
                    className="text-secondary-text text-[12px] p-2 w-full bg-background-secondary rounded-md"
                />
            </div>
            <div className="space-y-3 p-3 border border-border-clr rounded-lg bg-card-clr">
                <p className="text-secondary-text text-[14px] font-semibold">
                    E-mail
                </p>
                <input
                    type="text"
                    className="text-secondary-text text-[12px] p-2 w-full bg-background-secondary rounded-md"
                />
            </div>
            <div className="space-y-3 p-3 border border-border-clr rounded-lg bg-card-clr">
                <p className="text-secondary-text text-[14px] font-semibold">
                    Password
                </p>
                <div className="space-y-3">
                    <p className="text-secondary-text text-[12px]">
                        Old Password
                    </p>
                    <input
                        type="text"
                        className="text-secondary-text text-[12px] p-2 w-full bg-background-secondary rounded-md"
                    />
                </div>
                <div className="space-y-3">
                    <p className="text-secondary-text text-[12px]">
                        New Password
                    </p>
                    <input
                        type="text"
                        className="text-secondary-text text-[12px] p-2 w-full bg-background-secondary rounded-md"
                    />
                </div>
            </div>
            <div className="flex md:justify-end">
                <button
                    type="submit"
                    className="bg-button-clr/10 border w-full md:w-fit border-button-clr rounded-md p-2 text-button-clr text-[14px] flex items-center gap-2 justify-center"
                >
                    <Save size={16} />
                    <span>Save Setting</span>
                </button>
            </div>
            <div className="bg-border-clr h-0.5 w-full rounded-full" />
            <div className="bg-red-500/25 p-3 rounded-md">
                <button
                    type="button"
                    className="bg-red-500 opacity-70 hover:opacity-100 transition-all w-full text-white p-2 rounded-md text-[14px] flex items-center justify-center gap-2"
                >
                    <LogOut size={18} />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
}

export default AccountPage;
