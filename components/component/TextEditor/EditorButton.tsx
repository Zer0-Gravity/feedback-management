import { useEditorState } from "@tiptap/react";
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
import React from "react";

function EditorButton({ editor }: { editor: any }) {
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

    return (
        <div className="flex gap-2 items-center">
            <button
                type="button"
                onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={`toolbar-toggle ${editorState?.isHeading1 ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
            >
                <Heading1 size={16} />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`toolbar-toggle ${editorState?.isHeading2 ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
            >
                <Heading2 size={16} />
            </button>
            <button
                type="button"
                onClick={() =>
                    editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={`toolbar-toggle ${editorState?.isHeading3 ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
            >
                <Heading3 size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`toolbar-toggle ${editorState?.isBulletList ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
            >
                <List size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`toolbar-toggle ${editorState?.isBold ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
            >
                <Bold size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                className={`toolbar-toggle ${editorState?.isUnderline ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
            >
                <Underline size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`toolbar-toggle ${editorState?.isItalic ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
            >
                <Italic size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                className={`toolbar-toggle ${editorState?.isCodeBlock ? "text-primary-text bg-button-clr" : "text-secondary-text bg-background"}`}
            >
                <Code size={16} />
            </button>
        </div>
    );
}

export default EditorButton;
