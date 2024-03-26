/*
  Warnings:

  - Added the required column `id_client` to the `facturi_emise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `facturi_emise` ADD COLUMN `id_client` INTEGER NOT NULL;
