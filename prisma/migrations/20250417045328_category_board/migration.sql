/*
  Warnings:

  - Added the required column `categoryId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Board` ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `deleteYn` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Board` ADD CONSTRAINT `Board_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
