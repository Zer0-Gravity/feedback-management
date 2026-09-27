"use client";

import TextEditor from "@/components/component/TextEditor/TextEditor";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { addPost } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Feature_Request", "Integration", "Bug_Report"];

export interface FormData {
    title: string;
    content?: string | undefined;
    category: string;
}

const schema = yup.object({
    title: yup.string().required("Title can't be empty"),
    content: yup.string().optional(),
    category: yup
        .string()
        .oneOf([...CATEGORIES])
        .required("Please select any category for your post"),
});

function FormSub() {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const { data: orgActive } = authClient.useActiveOrganization(); //Get current active organization
    const router = useRouter();

    const handleNewPost = async (data: FormData) => {
        try {
            if (!orgActive) {
                toast.error("Please select a company first");
                return;
            }

            await toast.promise(addPost(data, orgActive?.id), {
                loading: "Creating your post",
                success: "Post created successfully",
                error: "Failed to create a post, please try again",
            });

            router.push("/post");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleNewPost)}
            className="flex flex-col gap-3 "
        >
            <div className="flex flex-1 gap-2 items-center">
                <div>
                    <input
                        {...register("title")}
                        type="text"
                        className="border p-2 border-b border-border-clr w-full lg:w-125 bg-background rounded-lg text-primary-text text-[16px]"
                        placeholder="Title..."
                    />

                    {errors.title && (
                        <p className="error-message">{errors.title.message}</p>
                    )}
                </div>

                {/* Select controller */}
                <Controller
                    name="category"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <div>
                            <Select
                                value={field.value ?? ""}
                                onValueChange={(val) =>
                                    field.onChange(val as string)
                                }
                            >
                                <SelectTrigger className="flex gap-2 items-center bg-button-clr text-white p-2 rounded-lg border-0">
                                    <SelectValue
                                        placeholder="Category"
                                        className="text-[12px]"
                                    />
                                </SelectTrigger>

                                <SelectContent
                                    align="end"
                                    className="bg-background ring-0"
                                >
                                    <SelectGroup>
                                        <SelectLabel className="text-primary-text text-[12px]">
                                            Category
                                        </SelectLabel>
                                        <SelectItem
                                            value="Feature_Request"
                                            className="select-item-style"
                                        >
                                            Feature Request
                                        </SelectItem>
                                        <SelectItem
                                            value="Integration"
                                            className="select-item-style"
                                        >
                                            Integration
                                        </SelectItem>
                                        <SelectItem
                                            value="Bug_Report"
                                            className="select-item-style"
                                        >
                                            Bug Report
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {error && (
                                <p className="error-message">{error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <Controller
                name="content"
                control={control}
                render={({ field }) => (
                    <TextEditor
                        style="rich-editor-new"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                    />
                )}
            />
            <div className="flex gap-2 items-center justify-end">
                <button
                    type="button"
                    className="border border-button-clr text-button-clr p-2 rounded-lg text-[14px]"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-button-clr text-white p-2 rounded-lg text-[14px]"
                >
                    Post
                </button>
            </div>
        </form>
    );
}

export default FormSub;
