import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
    const {cid} = event.context.params
    const firme =await prisma.Firme.findMany();
    
    console.log(firme)
    return {firma:cid}
})