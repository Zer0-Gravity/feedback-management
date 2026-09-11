import PageWrapper from "@/components/component/PageWrapper";
import MemberTable from "./table";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { columns, MemberList } from "./column";

async function Member() {
    const data = await auth.api.listMembers({ headers: await headers() });

    const mappedData: MemberList[] = data.members.map((member) => ({
        id: member.id,
        name: member.user.name,
        email: member.user.email,
        role: member.role,
    }));

    return (
        <PageWrapper header="Member">
            <MemberTable columns={columns} data={mappedData} />
        </PageWrapper>
    );
}

export default Member;
