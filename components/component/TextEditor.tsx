"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    Underline,
} from "lucide-react";

function TextEditor() {
    const editor = useEditor({
        extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] } })],
        content: <p>Type here...</p>,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "bg-background p-5 border border-border-clr text-primary-text text-[16px] h-full outline-none",
            },
        },
    });

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

    return (
        <div className="space-y-3">
            <div className="flex gap-2 items-center">
                <button
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run()
                    }
                    className={`h-6.25 w-6.25 flex items-center justify-center rounded-md ${editorState?.isHeading1 ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
                >
                    <Heading1 size={20} />
                </button>
                <button
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                    className={`h-6.25 w-6.25 flex items-center justify-center rounded-md ${editorState?.isHeading2 ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
                >
                    <Heading2 size={20} />
                </button>
                <button
                    onClick={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                    }
                    className={`h-6.25 w-6.25 flex items-center justify-center rounded-md ${editorState?.isHeading3 ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
                >
                    <Heading3 size={20} />
                </button>
                <button
                    onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                    }
                    className={`h-6.25 w-6.25 flex items-center justify-center rounded-md ${editorState?.isBulletList ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
                >
                    <List size={20} />
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`h-6.25 w-6.25 flex items-center justify-center rounded-md ${editorState?.isBold ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
                >
                    <Bold size={20} />
                </button>
                <button
                    onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                    }
                    className={`h-6.25 w-6.25 flex items-center justify-center rounded-md ${editorState?.isUnderline ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
                >
                    <Underline size={20} />
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`h-6.25 w-6.25 flex items-center justify-center rounded-md ${editorState?.isItalic ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
                >
                    <Italic size={20} />
                </button>
                <button
                    onClick={() => editor?.chain().focus().toggleCode().run()}
                    className={`h-6.25 w-6.25 flex items-center justify-center rounded-md ${editorState?.isCodeBlock ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
                >
                    <Code size={20} />
                </button>
            </div>
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
