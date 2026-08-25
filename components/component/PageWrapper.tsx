import React, { ReactNode } from "react";

function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <main className="flex justify-center h-screen">
            <div className="w-full md:w-[80%] p-4 flex flex-col gap-3">
                {children}
            </div>
        </main>
    );
}

export default PageWrapper;
