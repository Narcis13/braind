import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default defineEventHandler( async (event)=>{
const body = await readBody(event);
body.antet.dataFactura = new Date(body.antet.dataFactura).toISOString()
body.antet.scadenta = new Date(body.antet.scadenta).toISOString()
let itemi=body.itemi;

const antetfe = await prisma.facturiEmise.create(
    {
        data:body.antet
    }
)

itemi.map(item=>{
    delete item.nrcrt;
    delete item.produs;
    item.stare="activ";
    item.idFacturaEmisa= antetfe.id
    item.idProdus=item.idprodus;
    delete item.idprodus;
})
const linii = await prisma.linieFacturiEmise.createMany({
    data:itemi
})
let rez={succes:true,antetfe,linii}
//rez[tip]=item
//console.log('creez femisa',linii)
    return rez;
})