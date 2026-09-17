"use client";

import DOMPurify from "dompurify";

export function ContentPost({ content }: { content: string }) {
    const sanitizedHtml = DOMPurify.sanitize(content);

    return (
        <div
            className="text-primary-text tiptap"
            dangerouslySetInnerHTML={{
                __html: sanitizedHtml,
            }}
        ></div>
    );
}

export function ContentPostInline({ content }: { content: string }) {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(content, "text/html");

    // Convert the raw string to html body
    const plainText = parsedHtml.body.textContent || "";

    return (
        <p className="text-secondary-text text-[12px] truncate">{plainText}</p>
    );
}
