-- CreateTable
CREATE TABLE `facturi_emise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idClient` INTEGER NOT NULL,
    `dataFactura` DATETIME(3) NOT NULL,
    `scadenta` DATETIME(3) NULL,
    `serie` VARCHAR(191) NOT NULL,
    `numar` INTEGER NOT NULL,
    `idSerieFactura` INTEGER NULL,
    `intocmit` VARCHAR(191) NULL,
    `cnp` VARCHAR(191) NULL,
    `mentiuni` VARCHAR(191) NULL,
    `tip` ENUM('FISCALA', 'PROFORMA', 'AVIZ', 'RECURENTA') NOT NULL,
    `dataCreere` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataModificare` DATETIME(3) NOT NULL,
    `stare` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `linii_facturi_emise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idFacturaEmisa` INTEGER NOT NULL,
    `idProdus` INTEGER NOT NULL,
    `descriere` VARCHAR(191) NULL,
    `um` VARCHAR(191) NOT NULL,
    `cantitate` DOUBLE NOT NULL,
    `pret` DOUBLE NOT NULL,
    `valoare` DOUBLE NOT NULL,
    `stare` VARCHAR(191) NOT NULL,
    `dataCreere` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataModificare` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `linii_facturi_emise` ADD CONSTRAINT `linii_facturi_emise_idFacturaEmisa_fkey` FOREIGN KEY (`idFacturaEmisa`) REFERENCES `facturi_emise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
