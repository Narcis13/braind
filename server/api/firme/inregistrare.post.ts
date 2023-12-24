import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
const body = await readBody(event);


const firma = await prisma.firme.create(
    {data:{
        denumire:body.denumire,
        oras:body.oras,
        cui:body.cui,
        adresa:body.adresa,
        forma_juridica:body.formajuridica,
        judet:body.judet,
        id_user:body.id_user,
        stare:"inactiv"
    }}
)
//console.log('creez firma',body)
    return {succes:true,firma}
})