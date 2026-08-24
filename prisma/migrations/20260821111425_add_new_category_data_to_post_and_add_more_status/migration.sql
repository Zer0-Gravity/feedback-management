/*
  Warnings:

  - The values [In_Review] on the enum `StatusPost` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Feature_Request', 'Integration', 'Bug_Report');

-- AlterEnum
BEGIN;
CREATE TYPE "StatusPost_new" AS ENUM ('Backlog', 'Accepted', 'Rejected', 'In_Progress', 'Review', 'Completed');
ALTER TABLE "public"."Post" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "status" TYPE "StatusPost_new" USING ("status"::text::"StatusPost_new");
ALTER TYPE "StatusPost" RENAME TO "StatusPost_old";
ALTER TYPE "StatusPost_new" RENAME TO "StatusPost";
DROP TYPE "public"."StatusPost_old";
ALTER TABLE "Post" ALTER COLUMN "status" SET DEFAULT 'Backlog';
COMMIT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'Feature_Request';
