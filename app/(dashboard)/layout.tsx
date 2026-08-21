import AppLayout from "@/components/component/AppLayout";
import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
    return (
        <main>
            <AppLayout>{children}</AppLayout>
        </main>
    );
}
