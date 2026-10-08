import {
    KanbanSquare,
    Key,
    Mail,
    Newspaper,
    Notebook,
    Scaling,
    Send,
    Table2,
    UsersRound,
    Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    const cardSection2 = [
        {
            icon: Newspaper,
            title: "Feed",
            desc: "A feed of new posts idea from every company you belong to, including a rich-text editor for your replies to discuss with other members.",
        },
        {
            icon: KanbanSquare,
            title: "Team roadmap",
            desc: "Show what's in your company roadmap, and track every post you vote or make, to see where they going.",
        },
        {
            icon: Send,
            title: "Manage post",
            desc: "Search, sort, delete and filter every post you've submitted across all the companies you've joined.",
        },
        {
            icon: UsersRound,
            title: "Members",
            desc: "As admin and owner you can Invite teammates by email and assign Admin or Member roles. Track every invite you sent",
        },
        {
            icon: Table2,
            title: "Audit post",
            desc: "Review every submission in your organization and change its status from a single table as development moves.",
        },
        {
            icon: Scaling,
            title: "Responsive design",
            desc: "Work for you both desktop and mobile device. So you can access it anytime and anywhere",
        },
    ];

    const roadmapStatuses = [
        {
            title: "Backlog",
            desc: "Received and waiting for review",
        },
        {
            title: "Accepted",
            desc: "Approved by your team.",
        },
        {
            title: "Progress",
            desc: "Someone is building it.",
        },
        {
            title: "Review",
            desc: "Ready to be checked.",
        },
        {
            title: "Completed",
            desc: "Shipped to customers",
        },
    ];

    const cardSection3 = [
        { icon: Mail, title: "Invite via e-mail" },
        { icon: Key, title: "3 Roles" },
        { icon: Wrench, title: "Manage members" },
        { icon: Notebook, title: "Track invitation" },
    ];

    return (
        <main className="w-full h-full space-y-5 bg-background-secondary pb-26">
            <header className="flex justify-between border-b-3 border-b-border-clr p-3">
                <Image
                    src={"/VotifyFull.svg"}
                    alt="app-logo"
                    width={100}
                    height={100}
                />

                <div className="flex gap-2 items-center">
                    <Link
                        href={"/sign-in"}
                        className="text-primary-text text-[14px] font-medium"
                    >
                        Sign In
                    </Link>
                    <Link
                        href={"/sign-up"}
                        className="text-accent-clr text-[14px] font-medium"
                    >
                        Sign Up
                    </Link>
                </div>
            </header>

            <div className="w-full max-w-350 mx-auto p-5 space-y-15">
                <section className="flex lg:justify-between justify-center gap-2 flex-col lg:flex-row">
                    <div className="space-y-3 flex flex-col items-center lg:items-start">
                        <p className="text-[12px] text-accent-clr font-bold">
                            Feedback management app for your company
                        </p>
                        <h1 className="text-primary-text font-bold text-[30px] md:text-[50px] max-w-2xl leading-10 md:leading-13 text-center lg:text-left">
                            Every idea your customer or team suggest are in one
                            place.
                        </h1>
                        <p className="text-[12px] md:text-[14px] text-secondary-text max-w-100 text-center lg:text-left">
                            Votify collects feature requests, bug reports and
                            integration asks in one place. Your team decides
                            what&apos;s next, and everyone can watch it move
                            across the roadmap.
                        </p>
                        <button className="h-12.5 w-50 bg-accent-clr rounded-full text-white">
                            Start here
                        </button>
                    </div>
                    <div className="w-full lg:w-150 aspect-15/8  relative shadow-lg shadow-accent-clr self-center">
                        <Image
                            src={"/Feed.png"}
                            alt="feed-image"
                            fill
                            sizes="(min-width: 1024px) 600px, 100vw"
                            className="rounded-lg object-contain"
                        />
                    </div>
                </section>

                <section className="space-y-3">
                    <div className="space-y-2">
                        <h1 className="text-[30px] font-bold max-w-125">
                            One home for your team to progress{" "}
                        </h1>
                        <p className="text-[12px] text-secondary-text max-w-100">
                            Stop losing ideas in meetings and chat threads. Your
                            team can log each idea as a post that coworkers can
                            discuss and vote on it
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cardSection2.map((card, index) => (
                            <div
                                key={index}
                                className="bg-card-clr p-5 w-full h-50 rounded-lg flex flex-col gap-3 cursor-pointer hover:scale-102 hover:shadow-lg hover:shadow-accent-clr transition-all"
                            >
                                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-accent-clr/30 border-2 border-accent-clr text-accent-clr">
                                    <card.icon size={20} />
                                </div>
                                <h1 className="font-bold text-[18px]">
                                    {card.title}
                                </h1>
                                <p className="text-[14px] text-secondary-text">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col gap-2 justify-between">
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <h1 className="text-[30px] font-bold max-w-125">
                                From idea to shipped feature in five progress
                            </h1>
                            <p className="text-[12px] text-secondary-text max-w-100">
                                Stop losing ideas in meetings and chat threads.
                                Your team can log each idea as a post that
                                coworkers can discuss and vote on it
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                            {roadmapStatuses.map((road, index) => (
                                <div
                                    key={index}
                                    className="bg-card-clr rounded-md p-2 w-full h-25 cursor-pointer hover:scale-101 hover:shadow-lg transition-all"
                                >
                                    <h1 className="text-primary-text font-bold">
                                        {road.title}
                                    </h1>
                                    <p className="text-secondary-text text-[12px]">
                                        {road.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full max-w-[1000px] aspect-15/4 relative self-center shadow-lg shadow-accent-clr">
                        <Image
                            src={"/Roadmap.png"}
                            fill
                            className="rounded-lg object-contain"
                            alt="roadmap-image"
                        />
                    </div>
                </section>

                <section className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <h1 className="text-[30px] font-bold max-w-125">
                            Your whole team. with the right access
                        </h1>
                        <p className="text-[12px] text-secondary-text max-w-100">
                            Only employees you invite can join. Keep control
                            over who can change what.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        {cardSection3.map((card, index) => (
                            <div
                                key={index}
                                className="p-2 rounded-md text-accent-clr border-2 border-accent-clr bg-accent-clr/20 flex gap-2"
                            >
                                <card.icon size={18} />
                                <p className="text-[14px] font-semibold">
                                    {card.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full flex flex-col gap-3 justify-center items-center bg-card-clr py-10 px-5 rounded-lg">
                    <h1 className="text-[30px] md:text-[50px] text-primary-text text-center font-bold">
                        Start capturing ideas today
                    </h1>
                    <p className="text-[14px] text-secondary-text text-center">
                        Create a workspace, invite your employees and post your
                        first idea in minutes.
                    </p>
                    <Link
                        href={"/sign-in"}
                        className="w-full max-w-100 p-2 rounded-full bg-accent-clr text-white text-center text-[14px]"
                    >
                        Start Now
                    </Link>
                </section>
            </div>
        </main>
    );
}
