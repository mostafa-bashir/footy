/*
  Warnings:

  - You are about to drop the column `ScoreB` on the `Match` table. All the data in the column will be lost.
  - Added the required column `scoreB` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Match` DROP COLUMN `ScoreB`,
    ADD COLUMN `scoreB` INTEGER NOT NULL;
