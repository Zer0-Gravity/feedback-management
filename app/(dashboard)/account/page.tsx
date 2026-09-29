import PageWrapper from "@/components/component/PageWrapper";
import AccountPage from "./AccountPage";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function Account() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) return;

    const accountDb = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    return (
        <PageWrapper header="Account" desc="Manage your account here">
            <AccountPage account={accountDb} />
        </PageWrapper>
    );
}

export default Account;
