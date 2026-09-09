"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorButton from "./EditorButton";
import { useEffect, useRef } from "react";

function TextEditor({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const onChangeRef = useRef(onChange); //Stable reference

    const editor = useEditor({
        extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } })],
        immediatelyRender: false,
        content: value, //Set the value to hook form
        onUpdate: ({ editor }) => {
            // Send update back to hook form
            if (onChangeRef.current) {
                onChangeRef.current(editor.getHTML());
            }
        },
        editorProps: {
            attributes: {
                class: "bg-background p-5 border border-border-clr text-primary-text text-[16px] min-h-full outline-none rounded-lg",
            },
        },
    });

    //Handle value reset
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value, { emitUpdate: false });
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div>
            <EditorButton editor={editor} />
            <EditorContent editor={editor} className="min-h-[600px]" />
        </div>
    );
}

export default TextEditor;
