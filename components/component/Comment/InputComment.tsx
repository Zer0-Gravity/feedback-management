"use client";

import { Controller, useForm } from "react-hook-form";
import TextEditor from "../TextEditor/TextEditor";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
    .object({
        comment: yup.string().required("comment can't be empty"),
    })
    .required();

function InputComment() {
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema),
    });

    const handleComment = (data: any) => {
        console.log(data);
    };

    return (
        <form className="relative" onSubmit={handleSubmit(handleComment)}>
            <Controller
                name="comment"
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

            <button
                type="submit"
                className="text-[12px] rounded-full text-white bg-button-clr px-2 py-1 absolute"
            >
                Send
            </button>
        </form>
    );
}

export default InputComment;
