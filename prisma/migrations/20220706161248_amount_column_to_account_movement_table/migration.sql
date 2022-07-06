/*
  Warnings:

  - Added the required column `amount` to the `account_movements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account_movements` ADD COLUMN `amount` DOUBLE NOT NULL;
