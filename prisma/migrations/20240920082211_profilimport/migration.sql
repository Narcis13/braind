-- CreateTable
CREATE TABLE `detaliiimportsaga` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contdebitimplicit` VARCHAR(20) NULL DEFAULT '628',
    `contcreditimplicit` VARCHAR(20) NULL DEFAULT '704',
    `configurare` VARCHAR(1024) NULL,
    `idfirma` INTEGER NOT NULL,
    `stare` VARCHAR(48) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
