import { ReactNode } from "react";

export default function LandingPage({ children }: { children: ReactNode }) {
    return <div className="min-h-full w-full">{children}</div>;
}
