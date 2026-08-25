import AppLayout from "@/components/component/AppLayout";
import { ThemeProvider } from "@/components/component/ThemeProvider";
import { ReactNode } from "react";

export default async function Dashboard({ children }: { children: ReactNode }) {
    return (
        <main>
            <ThemeProvider>
                <AppLayout>
                    <div>{children}</div>
                </AppLayout>
            </ThemeProvider>
        </main>
    );
}
