"use client";

import { User } from "@/app/generated/prisma/client";
import { authClient } from "@/lib/auth-client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, LogOut, Save } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

interface AccountProps {
    account: User | null;
}

const schema = yup
    .object({
        username: yup.string().required("Username is required"),
        email: yup
            .string()
            .email("Invalid email address")
            .required("Email is required"),
        oldPassword: yup.string().optional(),
        newPassword: yup
            .string()
            .optional()
            .min(8, "Password must at least have 8 character"),
    })
    .required();

type FormValue = yup.InferType<typeof schema>;

function AccountPage({ account }: AccountProps) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValue>({
        // Set default value for each input field
        defaultValues: {
            username: account?.name,
            email: account?.email,
            oldPassword: "",
            newPassword: "",
        },
        resolver: yupResolver(schema),
    });

    const router = useRouter();

    const handleUpdate = async (data: FormValue) => {
        // Check if the user input data name not equal with the current saved data
        // If true update the username
        if (data.username && data.username !== account?.name) {
            await authClient.updateUser({
                name: data.username,
            });
        }

        //Update for email
        if (data.email && data.email !== account?.email) {
            await authClient.changeEmail({
                newEmail: data.email,
            });
        }

        if (data.oldPassword && data.newPassword) {
            const { error } = await authClient.changePassword({
                currentPassword: data.oldPassword,
                newPassword: data.newPassword,
            });

            //Check error code
            if (error?.code === "INVALID_PASSWORD") {
                //Throw error message
                setError("oldPassword", {
                    type: "server",
                    message: "Current password is invalid",
                });

                return;
            }
        }

        toast.success("Account updated");
        //Refresh the page
        router.refresh();
    };

    return (
        <form
            onSubmit={handleSubmit(handleUpdate)}
            className="h-full flex flex-col gap-2 w-full md:w-[50%]"
        >
            <div className="space-y-3 p-3 border border-border-clr rounded-lg bg-card-clr">
                <p className="text-secondary-text text-[14px] font-semibold">
                    Username
                </p>
                <input
                    {...register("username")}
                    type="text"
                    className="text-secondary-text text-[12px] p-2 w-full bg-background-secondary rounded-md"
                />
                {errors.username && (
                    <p className="error-message">{errors.username?.message}</p>
                )}
            </div>
            <div className="space-y-3 p-3 border border-border-clr rounded-lg bg-card-clr">
                <p className="text-secondary-text text-[14px] font-semibold">
                    E-mail
                </p>
                <input
                    {...register("email")}
                    type="text"
                    className="text-secondary-text text-[12px] p-2 w-full bg-background-secondary rounded-md"
                />
                {errors.email && (
                    <p className="error-message">{errors.email?.message}</p>
                )}
            </div>
            <div className="space-y-3 p-3 border border-border-clr rounded-lg bg-card-clr">
                <p className="text-secondary-text text-[14px] font-semibold">
                    Password
                </p>
                <div className="space-y-3">
                    <p className="text-secondary-text text-[12px]">
                        Current Password
                    </p>
                    <input
                        {...register("oldPassword")}
                        type="password"
                        className="text-secondary-text text-[12px] p-2 w-full bg-background-secondary rounded-md"
                    />
                    {errors.oldPassword && (
                        <p className="error-message">
                            {errors.oldPassword?.message}
                        </p>
                    )}
                </div>
                <div className="space-y-3">
                    <p className="text-secondary-text text-[12px]">
                        New Password
                    </p>
                    <input
                        {...register("newPassword")}
                        type="password"
                        className="text-secondary-text text-[12px] p-2 w-full bg-background-secondary rounded-md"
                    />
                    {errors.newPassword && (
                        <p className="error-message">
                            {errors.newPassword?.message}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex md:justify-end">
                <button
                    type="submit"
                    className="bg-button-clr/10 border w-full md:w-fit border-button-clr rounded-md p-2 text-button-clr text-[14px] flex items-center gap-2 justify-center"
                >
                    {isSubmitting ? (
                        <>
                            {" "}
                            <Loader2 size={18} />
                            <span>Submitting</span>
                        </>
                    ) : (
                        <>
                            {" "}
                            <Save size={16} />
                            <span>Save Setting</span>
                        </>
                    )}
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
        </form>
    );
}

export default AccountPage;
