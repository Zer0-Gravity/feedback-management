/*
  Warnings:

  - Added the required column `company_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "company_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Post_company_id_idx" ON "Post"("company_id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
