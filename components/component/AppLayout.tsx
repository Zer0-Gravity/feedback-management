import {
    Newspaper,
    Send,
    SquareKanban,
    TableProperties,
    User,
    Users,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import AccountBar from "./AccountBar";

async function AppLayout({ children }: { children: ReactNode }) {
    const navList = [
        { link: "feed", name: "Feed", icon: Newspaper },
        { link: "roadmap", name: "Roadmap", icon: SquareKanban },
        { link: "post", name: "Post", icon: Send },
        { link: "member", name: "Member", icon: Users },
        { link: "audit-post", name: "Audit Post", icon: TableProperties },
    ];

    return (
        <main className="flex md:flex-row flex-col h-screen">
            {/* | Desktop Sidebar | */}
            <aside className="w-65 p-5 hidden md:flex flex-col">
                <nav className="space-y-2 flex-1">
                    {navList.map((list, index) => (
                        <Link
                            key={index}
                            href={`/${list.link}`}
                            className="flex gap-2 items-center p-1.5 w-full relative"
                        >
                            <list.icon
                                size={20}
                                className="text-primary-text"
                            />

                            <span className="text-primary-text text-[14px]">
                                {list.name}
                            </span>
                        </Link>
                    ))}
                </nav>

                <AccountBar />
            </aside>

            {/* | Main Content | */}
            <section className="flex-1 max-h-full overflow-hidden bg-background-secondary">
                {children}
            </section>

            {/* | Mobile bottom bar | */}
            <div className="md:hidden">
                <nav className="flex justify-around p-2 ">
                    {navList.map((list, index) => (
                        <Link
                            key={index}
                            href={`/${list.link}`}
                            className="flex gap-2 flex-col items-center"
                        >
                            <list.icon
                                size={20}
                                className="text-primary-text"
                            />
                            <span className="text-[12px] text-primary-text">
                                {list.name}
                            </span>
                        </Link>
                    ))}

                    <button className="flex gap-2 flex-col items-center">
                        <User size={20} className="text-primary-text" />
                        <span className="text-[12px] text-primary-text">
                            Account
                        </span>
                    </button>
                </nav>
            </div>
        </main>
    );
}

export default AppLayout;
