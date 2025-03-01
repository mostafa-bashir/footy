-- DropForeignKey
ALTER TABLE `Match` DROP FOREIGN KEY `Match_mvpId_fkey`;

-- DropIndex
DROP INDEX `Match_mvpId_fkey` ON `Match`;

-- AlterTable
ALTER TABLE `Match` MODIFY `mvpId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_mvpId_fkey` FOREIGN KEY (`mvpId`) REFERENCES `Player`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
