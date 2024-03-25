import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{

    const q= await prisma.$queryRaw`
    SELECT id,numar,serie FROM facturi_emise
        order by dataCreere desc
        Limit 1;
    `
   //  console.log(q)
   let nr={}
   if(q.length>0){
   nr= {nrfact:q[0].numar+1,serie:q[0].serie}
   }
   else{
    const qs= await prisma.$queryRaw`
    SELECT primulnumar,serie FROM seriei
        order by created_at desc
        Limit 1;
    `
    nr={nrfact:parseInt(qs[0].primulnumar),serie:qs[0].serie}
   }
    return nr;
})