"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import TextField from "@/components/component/TextField";
import PasswordField from "@/components/component/PasswordField";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const schema = yup.object({
    name: yup.string().required("Name cant't be empty"),
    email: yup
        .string()
        .email("Invalid e-mail address")
        .required("Email can't be empty"),
    password: yup
        .string()
        .required("Password can't be empty")
        .min(8, "Password must have at least 8 character"),
    repeatPwd: yup
        .string()
        .oneOf([yup.ref("password")], "Password not match")
        .required("Please repeat password above"),
});

function SignUp() {
    const method = useForm({ resolver: yupResolver(schema) });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleRegister = async (data: any) => {
        setIsLoading(true);

        const { error } = await authClient.signUp.email(
            {
                name: data.name,
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        );
        console.log(data);

        setIsLoading(false);

        if (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-full">
            <section className="auth-wrapper">
                <h1 className="text-[40px] font-bold leading-tight my-5">
                    Let&apos;s create your account
                </h1>

                <FormProvider {...method}>
                    <form
                        onSubmit={method.handleSubmit(handleRegister)}
                        className="flex-1 space-y-3"
                    >
                        <TextField name="name" placeholder="your name" />
                        <TextField name="email" placeholder="e-mail" />
                        <PasswordField
                            name="password"
                            placeholder="type a password"
                        />
                        <PasswordField
                            name="repeatPwd"
                            placeholder="confirm password"
                        />

                        <button
                            type="submit"
                            className="h-10 bg-accent-clr text-white w-full rounded-md flex justify-center items-center"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <span className="text-[14px]">Sign-up</span>
                            )}
                        </button>
                    </form>
                </FormProvider>

                <p className="text-[12px]">
                    Already have account?{" "}
                    <Link className="underline text-blue-500" href={"/sign-in"}>
                        Sign-in
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

export default SignUp;
