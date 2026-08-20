import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <main className="flex flex-col gap-3 ">
                <h1>My landing page</h1>

                <Link
                    href={"/sign-in"}
                    className="p-1 bg-button-clr text-white rounded-lg flex item-center justify-center"
                >
                    Login
                </Link>
            </main>
        </div>
    );
}
