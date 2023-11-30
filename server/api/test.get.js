import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) =>{

    const usr = await prisma.user.findMany()
    console.log(usr)
})