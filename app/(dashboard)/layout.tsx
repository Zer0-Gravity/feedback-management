import AppLayout from "@/components/component/AppLayout";
import { ThemeProvider } from "@/components/component/ThemeProvider";
import TopBar from "@/components/component/TopBar";
import prisma from "@/lib/prisma";
import { ReactNode } from "react";

export default async function Dashboard({ children }: { children: ReactNode }) {
    //Get the company database
    const companyDb = await prisma.company.findMany();

    return (
        <main>
            <ThemeProvider>
                <AppLayout>
                    <TopBar companyDb={companyDb} />
                    <div>{children}</div>
                </AppLayout>
            </ThemeProvider>
        </main>
    );
}
