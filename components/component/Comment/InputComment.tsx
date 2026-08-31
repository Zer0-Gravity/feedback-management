"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorButton from "../TextEditor/EditorButton";
import { ReactNode } from "react";

function InputComment({ children }: { children?: ReactNode }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: "Write a comment..." }),
        ],
        editorProps: {
            attributes: {
                class: "w-full rounded-lg border border-border-clr p-3 text-[14px] text-primary-text outline-none",
            },
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <EditorButton editor={editor} />
            <EditorContent editor={editor} placeholder="Write a comment" />
            <div className="flex gap-2 items-center justify-end">
                {children}
                <button className="text-[12px] rounded-full text-white bg-button-clr px-2 py-1">
                    Send
                </button>
            </div>
        </div>
    );
}

export default InputComment;
