import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
    const {cid} = event.context.params
    const firma =await prisma.Firme.findFirst({where:{id_user:parseInt(cid)}});
    
   // console.log(firme)
    return firma
})