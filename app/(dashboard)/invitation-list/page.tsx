import PageWrapper from "@/components/component/PageWrapper";
import ListInvitation from "./ListInvitation";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function InvitationList() {
    const session = await auth.api.getOrganization({
        headers: await headers(),
    });

    const invitationDb = await prisma.invitation.findMany({
        where: { organizationId: session?.id },
        include: { user: true },
    });

    return (
        <PageWrapper
            header="Invitation list"
            desc="Manage and track member invitation list "
        >
            <ListInvitation listDb={invitationDb} />
        </PageWrapper>
    );
}

export default InvitationList;
