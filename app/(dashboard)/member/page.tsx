import PageWrapper from "@/components/component/PageWrapper";
import prisma from "@/lib/prisma";

async function Member() {
    const userDb = await prisma.user.findMany({
        include: { memberships: true },
    });

    return (
        <PageWrapper header="Member">
            <div></div>
        </PageWrapper>
    );
}

export default Member;
