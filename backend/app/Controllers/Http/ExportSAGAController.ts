import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Database from '@ioc:Adonis/Lucid/Database'
import xmlbuilder from 'xmlbuilder'
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: Env.get('OPENAPI_KEY'),
})
export default class ExportSAGAController{
  public async transformToXml({ params,response }: HttpContextContract) {
   let sql=`
   SELECT *
        FROM cdata.mesajepreluate
        WHERE 
          ( cuiclient = ${params.cui}
           OR cuifurnizor = ${params.cui} )
          AND MONTH(datafact) = ${params.luna}
          AND YEAR(datafact) = YEAR(CURRENT_DATE())
          ORDER BY datafact ASC
   `
   let lista = await  Database.rawQuery(sql)

   let sqlbis=`
   
   SELECT * FROM cdata.detaliiimportsaga imp 
   inner join cdata.Firme firme on firme.id=imp.idfirma 
   where cui='${params.cui}' 
   `
   let parametrii = await  Database.rawQuery(sqlbis)
   let replaced = parametrii[0][0].denumire.replace(/ /g, '_');
   //console.log(replaced)
    const xml = xmlbuilder.create('Facturi')
    //xml.ele('Factura',params.cui)
    let conturi:any[]=[]
    lista[0].map(f=>{
      if(f.tip=='FACTURA PRIMITA'){
        conturi.push({
          id:f.id,
          continut:f.primalinie,
          cont:''
        })
      }
     })

     console.log(JSON.stringify(conturi))

     lista[0].map(f=>{
      this.genFactura(xml,f,parametrii[0][0])
     })
      // console.log(params.luna)


    const xmlString = xml.end({ pretty: true })
    //console.log(lista[0])
   // return response.type('application/xml').send(xmlString)

       
   return response
      .header('Content-Type', 'application/xml')
      .header('Content-Disposition', `attachment; filename=F_${replaced}_${params.luna}_${Date.now()}.xml`)
      .send(xmlString)





  }

  private genFactura(root,data,params){
     const factura=root.ele('Factura')
     this.genAntet(factura,data)
    const continut= factura.ele('Detalii').ele('Continut')
    const itemi=JSON.parse(data.itemi)

    itemi.map(item=>{
       this.genLinie(continut,item,{params,data})
    })

    const sumar = factura.ele('Sumar')
    sumar.ele('TotalValoare').dat(data.totalfaratva.toFixed(2))
    sumar.ele('TotalTVA').dat((data.totalcutva - data.totalfaratva).toFixed(2))
    sumar.ele('Total').dat(data.totalcutva.toFixed(2))

    factura.ele('FacturaID').dat(data.id.toString())
    const observatii = factura.ele('Observatii')
    observatii.ele('txtObservatii')
    observatii.ele('SoldClient')
  }
  private genAntet(root,data){
     const antet=root.ele('Antet')
     antet.ele('FurnizorNume').dat(data.numefurnizor)
     antet.ele('FurnizorCIF').dat(data.fullcuifurnizor)
     antet.ele('FurnizorNrRegCom').dat('')
     antet.ele('FurnizorAdresa').dat('')
     antet.ele('FurnizorTara').dat('RO')
     antet.ele('FurnizorJudet').dat('')
     antet.ele('FurnizorLocalitate').dat('')
     antet.ele('FurnizorTelefon').dat('')
     antet.ele('FurnizorMail').dat('')
     antet.ele('ClientNume').dat(data.numeclient)
     antet.ele('ClientCIF').dat(data.fullcuiclient)
     antet.ele('ClientNrRegCom').dat('')
     antet.ele('ClientAdresa').dat('')
     antet.ele('Cod').dat('')
     antet.ele('FacturaID').dat(data.id.toString())
     antet.ele('FacturaNumar').dat(data.nrfact)
     antet.ele('FacturaData').dat(new Date(data.datafact).toLocaleDateString('ro-RO'))
     antet.ele('FacturaScadenta').dat(new Date(data.scadenta).toLocaleDateString('ro-RO'))
     antet.ele('FacturaTaxareInversa').dat('Nu')
     antet.ele('FacturaTVAIncasare').dat('Nu')
     antet.ele('FacturaTip').dat('F')
     antet.ele('FacturaCurs').dat('0.0000')
     antet.ele('FacturaMoneda').dat('RON')
     antet.ele('FacturaCotaTVA').dat('19')
     antet.ele('FacturaGreutate').dat('0.000')
  }

  private async askAI(model,systemprompt,userprompt){
    if(model==='gpt-4o'||model==='gpt-3.5-turbo'){
      const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: systemprompt },{role:"user", content:userprompt}],
          model: model,
        });
  
       return completion.choices[0].message.content;
  }
  }

  private genLinie(root,data,context){
    //console.log('context',context.params.contdebitimplicit,context.data.tip)
    const linie = root.ele('Linie')
    let cantitate=parseFloat(data.cantitate)
    let pret=(parseFloat(data.pret)*(100+parseInt(data.tva))/100)
    let valoare=(parseFloat(data.cantitate)*parseFloat(data.pret))

    linie.ele('LinieNrCrt').dat(data.nrcrt)
    linie.ele('Descriere').dat(data.denumire)
    linie.ele('Cont').dat(context.data.tip=='FACTURA PRIMITA'?context.params.contdebitimplicit:context.params.contcreditimplicit)
    linie.ele('InformatiiSuplimentare').dat('Nedefinit')
    linie.ele('UM').dat('buc')
    linie.ele('Cantitate').dat(data.cantitate)
    linie.ele('Pret').dat((parseFloat(data.pret)*(100+parseInt(data.tva))/100).toFixed(2))
    linie.ele('Valoare').dat((parseFloat(data.cantitate)*parseFloat(data.pret)).toFixed(2))
    linie.ele('TVA').dat((cantitate*pret-valoare).toFixed(2))
   // console.log('Linie',data,cantitate,pret,valoare)
  }
}