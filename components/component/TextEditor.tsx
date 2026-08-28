"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorButton from "./EditorButton";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const schema = yup.object({
    title: yup.string().required("Title can't be empty"),
    category: yup.string().required("Please select any category for your post"),
});

function TextEditor() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({ resolver: yupResolver(schema) });

    const editor = useEditor({
        extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } })],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "bg-background p-5 border border-border-clr text-primary-text text-[16px] min-h-full outline-none rounded-lg",
            },
        },
    });

    // Editor button state
    const editorState = useEditorState({
        editor,
        selector: (ctx) => ({
            isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
            isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
            isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
            isBulletList: ctx.editor?.isActive("bulletList") ?? false,
            isBold: ctx.editor?.isActive("bold") ?? false,
            isUnderline: ctx.editor?.isActive("underline") ?? false,
            isItalic: ctx.editor?.isActive("italic") ?? false,
            isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
        }),
    });

    if (!editor) {
        return null;
    }

    const handleNewPost = async (data: any) => {
        console.log(data);
    };

    return (
        <form
            onSubmit={handleSubmit(handleNewPost)}
            className="flex flex-col gap-3 "
        >
            <div className="flex gap-2 items-center">
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
            <EditorButton editor={editor} editorState={editorState} />
            <EditorContent editor={editor} className="min-h-[600px]" />
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

export default TextEditor;
