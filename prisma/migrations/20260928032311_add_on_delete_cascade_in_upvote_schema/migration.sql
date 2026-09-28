-- DropForeignKey
ALTER TABLE "UpVote" DROP CONSTRAINT "UpVote_post_id_fkey";

-- DropForeignKey
ALTER TABLE "UpVote" DROP CONSTRAINT "UpVote_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UpVote" ADD CONSTRAINT "UpVote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpVote" ADD CONSTRAINT "UpVote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
