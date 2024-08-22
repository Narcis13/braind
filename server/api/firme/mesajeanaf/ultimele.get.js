import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
    const elevenDaysAgo = new Date();
    elevenDaysAgo.setDate(elevenDaysAgo.getDate() - 11);
  
    // Fetch records from the last 11 days
    const mesaje = await prisma.mesajepreluate.findMany({
      where: {
        datamesaj: {
          gte: elevenDaysAgo, // greater than or equal to 11 days ago
        },
      },
    });
  
    
   return mesaje
})