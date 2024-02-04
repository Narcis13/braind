-- CreateTable
CREATE TABLE `produsi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_client` INTEGER NOT NULL,
    `denumire` VARCHAR(120) NOT NULL,
    `descriere` VARCHAR(512) NULL,
    `um` VARCHAR(50) NOT NULL,
    `grupproduse` VARCHAR(50) NULL,
    `codprodus` VARCHAR(13) NULL,
    `banca` VARCHAR(120) NULL,
    `codcpv` VARCHAR(24) NULL,
    `codnc` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
