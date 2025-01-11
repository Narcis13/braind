import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);

    // Get count of non-draft invoices for current year
    const drafts = await prisma.facturiEmise.count({
        where: {
            dataCreere: {
                gte: startOfYear,
                lte: endOfYear
            },
                stare: 'draft'
       
        }
    });

    const count = await prisma.facturiEmise.count({
        where: {
            dataCreere: {
                gte: startOfYear,
                lte: endOfYear
            },
            NOT: {
                stare: 'stearsa'
            }
        }
    });

    // Format next number
    const nextNumber = {
        serie: `FE${currentYear}`,
        nrfact: (''+(count + 1)).padStart(5, '0'),
        drafts
    };

    return nextNumber;
});