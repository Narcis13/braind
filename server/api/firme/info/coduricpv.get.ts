import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
//const route= useRoute()

export default defineEventHandler( async (event)=>{

    return prisma.coduricpv.findMany()
    
})