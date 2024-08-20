-- CreateTable
CREATE TABLE `mesajepreluate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datamesaj` INTEGER NOT NULL,
    `idmesaj` VARCHAR(20) NOT NULL,
    `idsolicitare` VARCHAR(20) NOT NULL,
    `tip` VARCHAR(16) NOT NULL,
    `cuiclient` VARCHAR(14) NOT NULL,
    `cuifurnizor` VARCHAR(14) NOT NULL,
    `numeclient` VARCHAR(64) NOT NULL,
    `numefurnizor` VARCHAR(64) NOT NULL,
    `datafact` DATETIME(3) NOT NULL,
    `nrfact` VARCHAR(48) NOT NULL,
    `scadenta` DATETIME(3) NULL,
    `note` VARCHAR(1024) NOT NULL,
    `totalfaratva` DOUBLE NOT NULL,
    `totalcutva` DOUBLE NOT NULL,
    `itemi` VARCHAR(1024) NOT NULL,
    `iduser` INTEGER NOT NULL,
    `idfirma` INTEGER NOT NULL,
    `stare` VARCHAR(48) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
