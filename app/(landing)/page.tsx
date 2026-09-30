import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="p-5">
            <header className="flex justify-between">
                <Image
                    src={"/VotifyFull.svg"}
                    alt="app-logo"
                    width={100}
                    height={100}
                />

                <Link
                    href={"/sign-in"}
                    className="p-1 bg-accent-clr text-white rounded-lg flex item-center justify-center"
                >
                    Login
                </Link>
            </header>
        </main>
    );
}
