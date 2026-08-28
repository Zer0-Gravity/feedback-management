import PageWrapper from "@/components/component/PageWrapper";
import TextEditor from "@/components/component/TextEditor";

async function NewPost() {
    return (
        <PageWrapper>
            <h1 className="text-[20px] md:text-[30px] font-bold text-primary-text">
                New Post
            </h1>

            <TextEditor />
        </PageWrapper>
    );
}

export default NewPost;
