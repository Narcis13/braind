-- CreateTable
CREATE TABLE `Firme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denumire` VARCHAR(100) NOT NULL,
    `cui` VARCHAR(20) NOT NULL,
    `judet` VARCHAR(13) NOT NULL,
    `oras` VARCHAR(20) NOT NULL,
    `adresa` VARCHAR(120) NOT NULL,
    `forma_juridica` VARCHAR(10) NOT NULL,
    `capital_social` INTEGER NULL,
    `registru_comert` VARCHAR(20) NULL,
    `codCAEN` VARCHAR(10) NULL,
    `logo` VARCHAR(255) NULL,
    `CIAdministrator` VARCHAR(255) NULL,
    `CertificatCUI` VARCHAR(255) NULL,
    `ActConstitutiv` VARCHAR(255) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administratori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_firma` INTEGER NOT NULL,
    `nume` VARCHAR(120) NOT NULL,
    `ci` VARCHAR(120) NULL,
    `cnp` VARCHAR(120) NOT NULL,
    `email` VARCHAR(120) NULL,
    `telefon` VARCHAR(120) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Administratori` ADD CONSTRAINT `Administratori_id_firma_fkey` FOREIGN KEY (`id_firma`) REFERENCES `Firme`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
