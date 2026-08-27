import PageWrapper from "@/components/component/PageWrapper";
import TextEditor from "@/components/component/TextEditor";

async function NewPost() {
    return (
        <PageWrapper>
            <h1 className="text-[30px] font-bold text-primary-text">
                New Post
            </h1>

            <div className="space-y-3">
                <input
                    type="text"
                    className="border p-2 border-b border-border-clr bg-background rounded-lg text-primary-text text-[16px]"
                    placeholder="Title..."
                />

                <TextEditor />
            </div>
        </PageWrapper>
    );
}

export default NewPost;
