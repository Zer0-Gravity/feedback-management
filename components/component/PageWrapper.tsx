import React, { ReactNode } from "react";

function PageWrapper({
    children,
    header,
}: {
    children: ReactNode;
    header?: string;
}) {
    return (
        <main className="flex justify-center h-screen">
            <div className="w-full md:w-[80%] p-3 flex flex-col gap-3">
                <h1 className="text-[20px] md:text-[30px] font-bold text-primary-text">
                    {header}
                </h1>

                {children}
            </div>
        </main>
    );
}

export default PageWrapper;
