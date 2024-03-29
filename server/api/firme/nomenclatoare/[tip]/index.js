import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
//const route= useRoute()

export default defineEventHandler( async (event)=>{
const q = getQuery(event)
const {tip} = event.context.params
//console.log('cruta',q)
    return prisma[tip+'i'].findMany({
        where:{
            id_client:parseInt(q.cid)
        },
        orderBy:[{id:'desc'}]
    });
})