import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
const body = await readBody(event);

/*const antetfe = await prisma[tip+'i'].create(
    {
        data:body
    }
)*/
let rez={succes:true}
//rez[tip]=item
console.log('creez femisa',body)
    return rez;
})