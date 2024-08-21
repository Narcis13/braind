import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
//const route= useRoute()

export default defineEventHandler( async (event)=>{

const body = await readBody(event);
//console.log('preiau measj',body)
body.datamesaj = new Date(body.datamesaj).toISOString()
body.datafact = new Date(body.datafact).toISOString()
body.scadenta = new Date(body.scadenta).toISOString()
const mesaj = await prisma.mesajepreluate.create(
    {
        data:body
    }
)

    return {succes:true,mesaj}
})