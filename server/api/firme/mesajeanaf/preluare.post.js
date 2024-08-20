import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
//const route= useRoute()

export default defineEventHandler( async (event)=>{

const body = await readBody(event);
console.log('preiau measj',body)



    return {succes:true}
})