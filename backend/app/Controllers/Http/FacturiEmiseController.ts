
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User';
import GeneratorFacturaXML from './GeneratorFacturaXML';
const axios = require("axios");
const xml2js = require('xml2js');
export default class FacturiEmiseController {

    public async printfactura({view,params}){

       let sql=`
       SELECT fe.id id,furnizor.denumire denumirefurnizor,furnizor.alias alias,furnizor.cui codfiscalfurnizor,cl.denumire numeclient,cl.codfiscal codfiscalclient, DATE_FORMAT(fe.dataFactura, '%d.%m.%Y') AS dataFactura,fe.scadenta scadenta,fe.serie serie, fe.numar numar ,fe.intocmit intocmit,fe.cnp cnp, fe.mentiuni mentiuni,produse.denumire numeprodus,liniife.descriere descriere,liniife.um um, liniife.cantitate cantitate,liniife.pret pret, liniife.valoare valoare FROM cdata.facturi_emise fe
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
  
    public async listamesaje({params}){
     //console.log(params)
     const user = await User.findOrFail(params.userid)
     const responseData = await this.getData(`https://api.anaf.ro/prod/FCTEL/rest/listaMesajeFactura?zile=10&cif=${params.cif}`, user.jwt)
     //console.log(responseData)
     return {mesaje:responseData.mesaje}
    }

    public async xmlfactura({params}){
        let sql=`
        SELECT fe.id id,furnizor.denumire denumirefurnizor,furnizor.cui codfiscalfurnizor,furnizor.adresa adresafurnizor,furnizor.oras orasfurnizor,furnizor.judet judetfurnizor,cl.denumire numeclient,cl.adresa adresaclient,cl.localitate orasclient,cl.codfiscal codfiscalclient,cl.judet judetclient, DATE_FORMAT(fe.dataFactura, '%Y-%m-%d') AS dataFactura,DATE_FORMAT(fe.scadenta, '%Y-%m-%d') AS scadenta,fe.serie serie, fe.numar numar ,fe.intocmit intocmit,fe.cnp cnp, fe.mentiuni mentiuni,produse.denumire numeprodus,liniife.descriere descriere,liniife.um um, liniife.cantitate cantitate,liniife.pret pret, liniife.valoare valoare FROM cdata.facturi_emise fe
        inner join cdata.clienti cl on cl.id=fe.idClient
        inner join cdata.Firme furnizor on furnizor.id=fe.id_client
        inner join cdata.linii_facturi_emise liniife on liniife.idFacturaEmisa=fe.id
        inner join cdata.produsi produse on produse.id=liniife.idProdus
             where fe.id=${params.id};
        `;
  
        let lista = await  Database.rawQuery(sql)
  
        let generator = new GeneratorFacturaXML(lista[0])
        const xmltext=generator.init()

        return {xmltext};
    }

    public async verificafactura({params}){
        const user = await User.findOrFail(params.userid)
      var r ={stare:''}
       const responseData = await this.getData(`https://api.anaf.ro/prod/FCTEL/rest/stareMesaj?id_incarcare=${params.id}`, user.jwt)
     
            //console.log('Response:', typeof responseData,responseData);
            const parser = new xml2js.Parser({ explicitArray: false });
            parser.parseString(responseData, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
            } else {
               // console.log(result.header.$.stare)
               r.stare=result.header.$.stare
              //  console.log('index_incarcare attribute value:', indexIncarcareValue);
            }
           // return {stare:'ok'}
        })
       
        return r;

       
    }

    public async trimitefactura({params}){
  
      const user = await User.findOrFail(params.userid)
      
      let sql=`
      SELECT fe.id id,furnizor.denumire denumirefurnizor,furnizor.cui codfiscalfurnizor,furnizor.adresa adresafurnizor,furnizor.oras orasfurnizor,furnizor.judet judetfurnizor,cl.denumire numeclient,cl.adresa adresaclient,cl.localitate orasclient,cl.codfiscal codfiscalclient,cl.judet judetclient, DATE_FORMAT(fe.dataFactura, '%Y-%m-%d') AS dataFactura,DATE_FORMAT(fe.scadenta, '%Y-%m-%d') AS scadenta,fe.serie serie, fe.numar numar ,fe.intocmit intocmit,fe.cnp cnp, fe.mentiuni mentiuni,produse.denumire numeprodus,liniife.descriere descriere,liniife.um um, liniife.cantitate cantitate,liniife.pret pret, liniife.valoare valoare FROM cdata.facturi_emise fe
      inner join cdata.clienti cl on cl.id=fe.idClient
      inner join cdata.Firme furnizor on furnizor.id=fe.id_client
      inner join cdata.linii_facturi_emise liniife on liniife.idFacturaEmisa=fe.id
      inner join cdata.produsi produse on produse.id=liniife.idProdus
           where fe.id=${params.id};
      `;

      let lista = await  Database.rawQuery(sql)

      let generator = new GeneratorFacturaXML(lista[0])
      const xmltext=generator.init()

      //console.log(xmltext)
      /*
      <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<header xmlns="mfp:anaf:dgti:spv:respUploadFisier:v1" dateResponse="202404191049" ExecutionStatus="0" index_incarcare="5010931561"/>
      */
     //console.log(`/test/FCTEL/rest/upload?standard=UBL&cif=${lista[0][0].codfiscalfurnizor}`)
      const raspunsvalidare = await this.postData("https://api.anaf.ro/prod/FCTEL/rest/validare/FACT1",xmltext,user.jwt)
      const raspunstrimitere = await this.postData(`https://api.anaf.ro/prod/FCTEL/rest/upload?standard=UBL&cif=${lista[0][0].codfiscalfurnizor}`,xmltext,user.jwt)
      let indexIncarcareValue = 0;
     // console.log(raspunsvalidare,raspunstrimitere)
      if(raspunstrimitere !== undefined){
        const parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(raspunstrimitere, (err, result) => {
        if (err) {
            console.error('Error parsing XML:', err);
        } else {
            indexIncarcareValue = result.header.$.index_incarcare;
          //  console.log('index_incarcare attribute value:', indexIncarcareValue);
        }
        });
      }


     
        return {succes:true,xmltext,raspunsvalidare,index_incarcare:indexIncarcareValue}
    }

    public async toateFacturilePerioadeiCurente(){
       // console.log('toate facturile')
        
      let sql=`
       SELECT fe.id id,furnizor.denumire denumirefurnizor,furnizor.cui codfiscalfurnizor,fe.indexincarcare indexincarcare, cl.denumire client,cl.codfiscal codfiscalclient, DATE_FORMAT(fe.dataFactura, '%d.%m.%Y') AS data,fe.scadenta scadenta,fe.serie serie, fe.numar numar ,fe.intocmit intocmit,fe.cnp cnp, fe.mentiuni mentiuni, sum(liniife.valoare) valoare , fe.notainterna notainterna, fe.stare stare FROM cdata.facturi_emise fe
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

    // private async  postDataWithBearerToken(url, data, token) {


    //     const options = {
    //       "method": "POST",
    //       "hostname": "api.anaf.ro",
    //       "port": null,
    //       "path": url,
    //       "headers": {
    //         "Accept": "*/*",
    //         "User-Agent": "Brainds Client",
    //         "Authorization": `Bearer ${token}`,
    //         "Content-Type": "text/plain"
    //       }
    //     };
        
    //     const req = http.request(options, function (res) {
    //       const chunks:any[] = [];
        
    //       res.on("data", function (chunk) {
    //         chunks.push(chunk);
    //       });
        
    //       res.on("end", function () {
    //         const body = Buffer.concat(chunks);
    //        // console.log(body.toString());
    //       // return res;
    //       });
    //     });
        
    //     req.write(data);
    //     req.end();
      
    //   }

    private async  getData(url, token) {
        try {
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
      
          const response = await axios.get(url, config);
          return response.data;
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      }

      private async  postData(url, data, token) {

        try {
            const config = {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'text/plain'
              }
            };
        
            const response = await axios.post(url, data, config);
            return response.data;
          } catch (error) {
            console.error('Error:', error);
            throw error;
          }
      }
}