import { ReactNode } from "react";

export default function Dashboard({ children }: { children: ReactNode }) {
    return (
        <main>
            <h1>Dashboard Overview</h1>
            {children}
        </main>
    );
}
