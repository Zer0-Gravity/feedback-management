import PageWrapper from "@/components/component/PageWrapper";
import ListInvitation from "./ListInvitation";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface InvitationProps {
    searchParams: Promise<{
        search: string;
        status: string;
    }>;
}

async function InvitationList({ searchParams }: InvitationProps) {
    const { search = "", status = "all" } = await searchParams;

    const session = await auth.api.getOrganization({
        headers: await headers(),
    });

    const invitationDb = await prisma.invitation.findMany({
        where: {
            organizationId: session?.id,
            AND: [
                ...(status !== "all" ? [{ status }] : []),
                ...(search
                    ? [
                          {
                              email: {
                                  contains: search,
                                  mode: "insensitive" as const,
                              },
                          },
                      ]
                    : []),
            ],
        },
        include: { user: true },
    });

    return (
        <PageWrapper
            header="Invitation list"
            desc="Manage and track member invitation list "
        >
            <ListInvitation
                listDb={invitationDb}
                search={search}
                status={status}
            />
        </PageWrapper>
    );
}

export default InvitationList;
