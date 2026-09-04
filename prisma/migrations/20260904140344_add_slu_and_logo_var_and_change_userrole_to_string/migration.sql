/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_role` on the `Membership` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "logo" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "user_role",
ADD COLUMN     "user_role" TEXT NOT NULL;

-- DropEnum
DROP TYPE "UserRole";

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");
