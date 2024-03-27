
import Database from '@ioc:Adonis/Lucid/Database'

export default class FacturiEmiseController {

    public async printfactura({view,params}){

       let sql=`
       SELECT fe.id id,furnizor.denumire denumirefurnizor,furnizor.cui codfiscalfurnizor,cl.denumire numeclient,cl.codfiscal codfiscalclient, fe.dataFactura dataFactura,fe.scadenta scadenta,fe.serie serie, fe.numar numar ,fe.intocmit intocmit,fe.cnp cnp, fe.mentiuni mentiuni,produse.denumire numeprodus,liniife.descriere descriere,liniife.um um, liniife.cantitate cantitate,liniife.pret pret, liniife.valoare valoare FROM cdata.facturi_emise fe
       inner join cdata.clienti cl on cl.id=fe.idClient
       inner join cdata.Firme furnizor on furnizor.id=fe.id_client
       inner join cdata.linii_facturi_emise liniife on liniife.idFacturaEmisa=fe.id
       inner join cdata.produsi produse on produse.id=liniife.idProdus
            where fe.id=${params.idf};
       `;

       let lista = await  Database.rawQuery(sql)
        console.log(params.idf,lista[0]) 
        return view.render('femise/model1')
    }

}