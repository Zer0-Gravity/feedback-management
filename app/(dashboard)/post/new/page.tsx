import PageWrapper from "@/components/component/PageWrapper";
import FormSub from "./form";

async function NewPost() {
    return (
        <PageWrapper header="New Post">
            <FormSub />
        </PageWrapper>
    );
}

export default NewPost;
