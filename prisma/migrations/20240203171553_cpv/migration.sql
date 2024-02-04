-- CreateTable
CREATE TABLE `coduricpv` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cod` VARCHAR(45) NOT NULL,
    `denumire` VARCHAR(255) NULL,

    UNIQUE INDEX `IDCod_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
