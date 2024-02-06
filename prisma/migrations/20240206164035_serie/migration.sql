-- CreateTable
CREATE TABLE `seriei` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_client` INTEGER NOT NULL,
    `tip` VARCHAR(64) NOT NULL,
    `serie` VARCHAR(12) NOT NULL,
    `primulnumar` VARCHAR(50) NOT NULL,
    `descriere` VARCHAR(512) NULL,
    `activa` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
