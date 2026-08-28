"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorButton from "./EditorButton";

function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } })],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "bg-background p-5 border border-border-clr text-primary-text text-[16px] h-full outline-none rounded-lg",
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

    return (
        <div className="space-y-3">
            <EditorButton editor={editor} editorState={editorState} />
            <EditorContent editor={editor} />;
            <div className="flex gap-2 items-center justify-end">
                <button className="border border-button-clr text-button-clr p-2 rounded-lg">
                    Cancel
                </button>
                <button className="bg-button-clr text-white p-2 rounded-lg">
                    Post
                </button>
            </div>
        </div>
    );
}

export default TextEditor;
