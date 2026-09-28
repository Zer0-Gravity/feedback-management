import PageWrapper from "@/components/component/PageWrapper";
import AccountPage from "./AccountPage";

async function Account() {
    return (
        <PageWrapper header="Account" desc="Manage your account here">
            <AccountPage />
        </PageWrapper>
    );
}

export default Account;
