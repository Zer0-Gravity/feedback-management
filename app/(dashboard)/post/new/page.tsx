import PageWrapper from "@/components/component/PageWrapper";
import FormSub from "./form";

export const dynamic = "force-dynamic";

async function NewPost() {
    return (
        <PageWrapper header="New Post">
            <FormSub />
        </PageWrapper>
    );
}

export default NewPost;
