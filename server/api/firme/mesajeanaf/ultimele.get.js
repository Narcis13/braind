import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
  const days = parseInt(getQuery(event).days) || 11;
 const cui = getQuery(event).cui||'*'
  //console.log('cui',cui)
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - days);

  // Fetch records from the specified number of days ago
  const mesaje = await prisma.mesajepreluate.findMany({
    where: {
      datamesaj: {
        gte: pastDate, // greater than or equal to the specified number of days ago
      },
      OR: [
        { cuiclient: cui },
        { cuifurnizor: cui }
      ]
    },
  });

  return mesaje;
})