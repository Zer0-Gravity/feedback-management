import AppLayout from "@/components/component/AppLayout";
import ModalComp from "@/components/component/Dialog/ModalComp";
import { ThemeProvider } from "@/components/component/ThemeProvider";
import { ReactNode, Suspense } from "react";
import { Toaster } from "react-hot-toast";

export default async function Dashboard({ children }: { children: ReactNode }) {
    return (
        <main>
            <ThemeProvider>
                <Toaster />
                <Suspense fallback={null}>
                    <ModalComp />
                </Suspense>
                <AppLayout>
                    <div>{children}</div>
                </AppLayout>
            </ThemeProvider>
        </main>
    );
}
