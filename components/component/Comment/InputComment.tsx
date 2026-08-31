"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import EditorButton from "../TextEditor/EditorButton";

function InputComment() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: "Write a comment..." }),
        ],
        editorProps: {
            attributes: {
                class: "w-full rounded-lg border border-border-clr p-3 text-[14px] text-primary-text",
            },
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <EditorContent editor={editor} placeholder="Write a comment" />
            <div className="flex justify-between items-center">
                <EditorButton editor={editor} />
                <button className="flex gap-1.5 rounded-full items-center justify-center text-white bg-button-clr px-2 py-1">
                    <p className="text-[12px]">Send</p>
                </button>
            </div>
        </div>
    );
}

export default InputComment;
