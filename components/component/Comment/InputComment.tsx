"use client";

import { Controller, useForm } from "react-hook-form";
import TextEditor from "../TextEditor/TextEditor";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addComment, addReply } from "@/app/(dashboard)/post/[id]/actions";
import { ReactNode } from "react";
import { useReply } from "@/utils/store";

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
    const { closeReply } = useReply();

    const handleComment = async (content: CommentProps) => {
        try {
            if (!postId) {
                toast.error("Post not found");
            }

            //Check if parent id exist, if so send a reply
            if (parentId) {
                await toast.promise(addReply(content, postId, parentId), {
                    loading: "Sending a reply..",
                    success: "Reply sended",
                    error: "Error when sending reply, please try again",
                });
            } else {
                await toast.promise(addComment(content, postId), {
                    loading: "Posting a comment...",
                    success: "Comment posted",
                    error: "Failed to post a comment, please try again",
                });
            }

            closeReply(); //Close the reply component
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleComment)}>
            <Controller
                name="content"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <div className="max-h-[90px]">
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

            <div className="flex gap-2 items-center justify-end">
                {children}
                <button
                    type="submit"
                    className="text-[12px] rounded-full text-white bg-button-clr px-2 py-1"
                >
                    Send
                </button>
            </div>
        </form>
    );
}

export default InputComment;
