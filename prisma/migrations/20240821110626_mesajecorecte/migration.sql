/*
  Warnings:

  - Changed the type of `datamesaj` on the `mesajepreluate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `mesajepreluate` DROP COLUMN `datamesaj`,
    ADD COLUMN `datamesaj` DATETIME(3) NOT NULL;
