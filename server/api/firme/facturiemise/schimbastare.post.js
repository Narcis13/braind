import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
const body = await readBody(event);
 console.log(body)

 const updatedFactura = await prisma.facturiEmise.update({
    where: { id: body.id },
    data: {
      stare: body.stare
    }
  });
    return {succes:true,updatedFactura}
})