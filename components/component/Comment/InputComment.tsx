"use client";

import { Controller, useForm } from "react-hook-form";
import TextEditor from "../TextEditor/TextEditor";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addComment } from "@/app/(dashboard)/post/[id]/actions";
import { ReactNode } from "react";

export interface CommentProps {
    content: string;
}

const schema = yup
    .object({
        content: yup.string().required("comment can't be empty"),
    })
    .required();

function InputComment({
    postId,
    parentId,
    children,
}: {
    postId: string;
    parentId?: string;
    children?: ReactNode;
}) {
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema),
    });

    const router = useRouter();

    const handleComment = async (content: CommentProps) => {
        try {
            if (!postId) {
                toast.error("Post not found");
            }

            await toast.promise(addComment(content, postId), {
                loading: "Posting a comment...",
                success: "Comment posted",
                error: "Failed to post a comment, please try again",
            });

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="relative" onSubmit={handleSubmit(handleComment)}>
            <Controller
                name="content"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <div>
                        <TextEditor
                            style="rich-editor-comment"
                            text="Write a comment"
                            value={field.value}
                            onChange={field.onChange}
                        />
                        {error && (
                            <p className="error-message">{error.message}</p>
                        )}
                    </div>
                )}
            />

            <div className="flex gap-2 items-center">
                <button
                    type="submit"
                    className="text-[12px] rounded-full text-white bg-button-clr px-2 py-1 absolute"
                >
                    Send
                </button>
            </div>
        </form>
    );
}

export default InputComment;
