import AppLayout from "@/components/component/AppLayout";
import ModalComp from "@/components/component/Dialog/ModalComp";
import { ThemeProvider } from "@/components/component/ThemeProvider";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default async function Dashboard({ children }: { children: ReactNode }) {
    return (
        <main>
            <ThemeProvider>
                <Toaster />
                <ModalComp />
                <AppLayout>
                    <div>{children}</div>
                </AppLayout>
            </ThemeProvider>
        </main>
    );
}
