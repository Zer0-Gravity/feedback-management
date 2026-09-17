"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorButton from "./EditorButton";
import { useEffect, useRef } from "react";
import Placeholder from "@tiptap/extension-placeholder";

function TextEditor({
    style,
    value,
    text,
    onChange,
}: {
    style: string;
    value: string;
    text?: string;
    onChange: (value: string) => void;
}) {
    const onChangeRef = useRef(onChange); //Stable reference

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
            Placeholder.configure({ placeholder: text }),
        ],
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
                class: style,
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
        <div className="space-y-2">
            <EditorButton editor={editor} />
            <EditorContent editor={editor} className="min-h-[600px]" />
        </div>
    );
}

export default TextEditor;
