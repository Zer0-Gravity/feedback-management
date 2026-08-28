import { Post } from "@/app/generated/prisma/client";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";

function PageDetail({ postDb }: { postDb: Post }) {
    return (
        <div>
            <button className="flex gap-2 items-center text-primary-text">
                <ArrowLeft size={14} /> <span>Back</span>
            </button>

            <div>
                <h1 className="text-primary-text text-[25px] font-bold">
                    {postDb.title}
                </h1>
                <p className="text-secondary-text text-[12px]">{`Submitted ${formatDistanceToNow(postDb.created_at, { addSuffix: true })}`}</p>
            </div>
        </div>
    );
}

export default PageDetail;
