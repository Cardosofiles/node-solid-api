/*
  Warnings:

  - Added the required column `gym_id` to the `check-ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `check-ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check-ins" ADD COLUMN     "gym_id" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "check-ins" ADD CONSTRAINT "check-ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check-ins" ADD CONSTRAINT "check-ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
