/*
  Warnings:

  - You are about to alter the column `serie` on the `facturi_emise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(12)`.
  - You are about to alter the column `intocmit` on the `facturi_emise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.
  - You are about to alter the column `cnp` on the `facturi_emise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(13)`.
  - You are about to alter the column `stare` on the `facturi_emise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(48)`.
  - You are about to alter the column `um` on the `linii_facturi_emise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.
  - You are about to alter the column `stare` on the `linii_facturi_emise` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(48)`.

*/
-- AlterTable
ALTER TABLE `facturi_emise` MODIFY `serie` VARCHAR(12) NOT NULL,
    MODIFY `intocmit` VARCHAR(64) NULL,
    MODIFY `cnp` VARCHAR(13) NULL,
    MODIFY `mentiuni` VARCHAR(512) NULL,
    MODIFY `stare` VARCHAR(48) NOT NULL,
    MODIFY `notainterna` VARCHAR(256) NULL;

-- AlterTable
ALTER TABLE `linii_facturi_emise` MODIFY `um` VARCHAR(64) NOT NULL,
    MODIFY `stare` VARCHAR(48) NOT NULL;
