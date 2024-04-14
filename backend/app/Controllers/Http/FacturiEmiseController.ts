
import Database from '@ioc:Adonis/Lucid/Database'
import GeneratorFacturaXML from './GeneratorFacturaXML';

export default class FacturiEmiseController {

    public async printfactura({view,params}){

       let sql=`
       SELECT fe.id id,furnizor.denumire denumirefurnizor,furnizor.cui codfiscalfurnizor,cl.denumire numeclient,cl.codfiscal codfiscalclient, DATE_FORMAT(fe.dataFactura, '%d.%m.%Y') AS dataFactura,fe.scadenta scadenta,fe.serie serie, fe.numar numar ,fe.intocmit intocmit,fe.cnp cnp, fe.mentiuni mentiuni,produse.denumire numeprodus,liniife.descriere descriere,liniife.um um, liniife.cantitate cantitate,liniife.pret pret, liniife.valoare valoare FROM cdata.facturi_emise fe
       inner join cdata.clienti cl on cl.id=fe.idClient
       inner join cdata.Firme furnizor on furnizor.id=fe.id_client
       inner join cdata.linii_facturi_emise liniife on liniife.idFacturaEmisa=fe.id
       inner join cdata.produsi produse on produse.id=liniife.idProdus
            where fe.id=${params.idf};
       `;

       let lista = await  Database.rawQuery(sql)
      //  console.log(params.idf,lista[0]) 
        let total=0
        lista[0].map(item=>{
            total+=item.valoare
        })
        return view.render('femise/model1',{factura:lista[0],total})
    }

    public async trimitefactura({params}){
     // console.log(params.id)

      let sql=`
      SELECT fe.id id,furnizor.denumire denumirefurnizor,furnizor.cui codfiscalfurnizor,furnizor.adresa adresafurnizor,furnizor.oras orasfurnizor,furnizor.judet judetfurnizor,cl.denumire numeclient,cl.codfiscal codfiscalclient, DATE_FORMAT(fe.dataFactura, '%Y-%m-%d') AS dataFactura,DATE_FORMAT(fe.scadenta, '%Y-%m-%d') AS scadenta,fe.serie serie, fe.numar numar ,fe.intocmit intocmit,fe.cnp cnp, fe.mentiuni mentiuni,produse.denumire numeprodus,liniife.descriere descriere,liniife.um um, liniife.cantitate cantitate,liniife.pret pret, liniife.valoare valoare FROM cdata.facturi_emise fe
      inner join cdata.clienti cl on cl.id=fe.idClient
      inner join cdata.Firme furnizor on furnizor.id=fe.id_client
      inner join cdata.linii_facturi_emise liniife on liniife.idFacturaEmisa=fe.id
      inner join cdata.produsi produse on produse.id=liniife.idProdus
           where fe.id=${params.id};
      `;

      let lista = await  Database.rawQuery(sql)

      let generator = new GeneratorFacturaXML(lista[0])
      const xmltext=generator.init()
      console.log(xmltext)
        return {succes:true,xmltext}
    }

    public async toateFacturilePerioadeiCurente(){
       // console.log('toate facturile')
        
      let sql=`
       SELECT fe.id id,furnizor.denumire denumirefurnizor,furnizor.cui codfiscalfurnizor,cl.denumire client,cl.codfiscal codfiscalclient, DATE_FORMAT(fe.dataFactura, '%d.%m.%Y') AS data,fe.scadenta scadenta,fe.serie serie, fe.numar numar ,fe.intocmit intocmit,fe.cnp cnp, fe.mentiuni mentiuni, sum(liniife.valoare) valoare , fe.notainterna notainterna, fe.stare stare FROM cdata.facturi_emise fe
       inner join cdata.clienti cl on cl.id=fe.idClient
       inner join cdata.Firme furnizor on furnizor.id=fe.id_client
       inner join cdata.linii_facturi_emise liniife on liniife.idFacturaEmisa=fe.id
       inner join cdata.produsi produse on produse.id=liniife.idProdus
       where fe.id_client=1 and fe.stare <> 'stearsa'
       group by fe.id
       order by fe.id desc
       `
       let lista = await  Database.rawQuery(sql)

       return {succes:true,mesaj:'ok',lista:lista[0]}
    }

}