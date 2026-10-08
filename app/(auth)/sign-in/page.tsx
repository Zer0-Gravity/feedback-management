"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

//Yup schema validator
const schema = yup
    .object({
        email: yup
            .string()
            .required("E-mail can't be empty")
            .email("Invalid e-mail address"),
        password: yup
            .string()
            .min(8, "Password must have at least 8 character")
            .required("Password can't be empty"),
        rememberMe: yup.boolean().optional(),
    })
    .required();

function SignIn() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const [passToggle, setPassToggle] = useState<boolean>(false); //Password toggle
    const [isLoading, setIsLoading] = useState<boolean>(false); //Loading spinner

    const handleLogin = async (data: any) => {
        setIsLoading(true);

        //Login functions
        const { error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
            callbackURL: "/feed",
        });

        setIsLoading(false);

        //Error field
        if (error) {
            if (error.status === 401) {
                toast.error("Invalid email or password"); //Send it to toaster
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <section className="w-full h-full flex justify-center flex-col md:h-175 md:w-112.5 p-8 md:p-17.5 md:border md:border-r-0 rounded-l-lg">
                {/* | Mini Logo | */}
                <div className="flex gap-2 items-center select-none">
                    <div className="h-3.75 w-3.75 bg-accent-clr" />
                    <h1 className="font-semibold text-[20px] text-accent-clr">
                        Votify.io
                    </h1>
                </div>

                {/* | Greeting | */}
                <div className="my-5 select-none">
                    <h1 className="text-[40px] font-bold">Hi,</h1>
                    <h1 className="text-[40px] font-bold">Welcome back</h1>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="space-y-3 flex-1"
                >
                    <div className="space-y-2">
                        <input
                            {...register("email")}
                            type="text"
                            className={`h-10 w-full rounded-[5px] text-[14px] p-2 border-2 border-border-clr ${errors.email && "border-red-500 text-red-500 outline-red-500"}`}
                            placeholder="e-mail"
                        />
                        {errors.email && (
                            <p className="text-[10px] text-red-500 font-medium">
                                {errors.email?.message}
                            </p>
                        )}
                    </div>

                    {/* Password field */}
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                {...register("password")}
                                type={passToggle ? "text" : "password"}
                                className={`h-10 w-full rounded-[5px] text-[14px] p-2 border-2 border-border-clr ${errors.password && "border-red-500 text-red-500 outline-red-500"}`}
                                placeholder="type a password"
                            />

                            <button
                                onClick={() => setPassToggle(!passToggle)}
                                type="button"
                                className="absolute top-1/2 -translate-y-1/2 right-4"
                            >
                                {passToggle ? (
                                    <Eye size={16} />
                                ) : (
                                    <EyeOff size={16} />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-[10px] text-red-500 font-medium">
                                {errors.password?.message}
                            </p>
                        )}
                    </div>

                    {/* Remember me toggle */}
                    <Controller
                        name="rememberMe"
                        control={control}
                        render={({ field }) => (
                            <div className="flex gap-2 items-center">
                                <Checkbox
                                    checked={field.value ?? false}
                                    onCheckedChange={field.onChange}
                                    id="remember"
                                    className="border-accent-clr rounded-[3px] data-checked:bg-accent-clr data-checked:border-0 size-3"
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-[12px] select-none"
                                >
                                    Remember me
                                </label>
                            </div>
                        )}
                    />

                    <button
                        type="submit"
                        className="h-10 bg-accent-clr text-white w-full rounded-md flex justify-center items-center"
                    >
                        {isLoading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <span className="text-[14px]">Sign-In</span>
                        )}
                    </button>

                    <div className="flex gap-2 items-center">
                        <div className="h-0.5 w-full bg-border-clr" />
                        <h1 className="text-[12px] font-medium">OR</h1>
                        <div className="h-0.5 w-full bg-border-clr" />
                    </div>

                    <button className="h-10 bg-accent-clr text-white w-full rounded-md flex justify-center items-center">
                        <span className="text-[14px]">Google</span>
                    </button>
                </form>

                {/* Divider */}

                <p className="text-[12px]">
                    Don&apos;t have account?{" "}
                    <Link className="underline text-blue-500" href={"/sign-up"}>
                        Sign-up
                    </Link>
                </p>
            </section>
            <section className="w-112.5 h-175 p-2 rounded-r-lg hidden md:flex relative border border-l-0">
                <Image
                    src="/AuthImagePage.jpg"
                    alt="auth-image"
                    fill
                    className="object-contain"
                />
            </section>
        </div>
    );
}

export default SignIn;
