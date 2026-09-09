import AppLayout from "@/components/component/AppLayout";
import NewCompany from "@/components/component/Dialog/NewCompany";
import { ThemeProvider } from "@/components/component/ThemeProvider";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default async function Dashboard({ children }: { children: ReactNode }) {
    return (
        <main>
            <ThemeProvider>
                <AppLayout>
                    <div>
                        <Toaster />
                        <NewCompany />
                        {children}
                    </div>
                </AppLayout>
            </ThemeProvider>
        </main>
    );
}
