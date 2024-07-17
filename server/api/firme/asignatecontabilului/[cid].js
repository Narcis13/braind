import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
    const {cid} = event.context.params
    const firma =await prisma.Firme.findMany({where:{id_contabil:parseInt(cid)}});
    
   // console.log(firme)
    return {firme:firma}
})