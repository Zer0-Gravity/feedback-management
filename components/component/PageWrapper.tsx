import React, { ReactNode } from "react";

function PageWrapper({
    children,
    header,
    desc,
}: {
    children: ReactNode;
    header?: string;
    desc?: string;
}) {
    return (
        <main className="flex justify-center h-screen">
            <div className="w-full md:w-[80%] p-3 flex flex-col gap-3 h-full min-h-0">
                <div className="flex flex-col gap-2">
                    <h1 className="text-[20px] md:text-[30px] font-bold text-primary-text">
                        {header}
                    </h1>
                    <p className="text-secondary-text text-[12px]">{desc}</p>
                </div>

                <div className="flex-1 min-h-0 flex flex-col">{children}</div>
            </div>
        </main>
    );
}

export default PageWrapper;
