import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <main className="w-screen h-screen">
            <div>
                <Toaster position="top-center" />
            </div>
            {children}
        </main>
    );
}
