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
const systemprompt=`

Esti un contabil experimentat care trebuie sa asigneze un cont de cheltuieli bunurilor si serviciilor. Ai la dispozitie acest extras de plan de conturi in care ai separate prin virgula simbolul contului si denumirea acelui cont dupa cum urmeaza:
"601","CHELTUIELI  CU MATERIILE PRIME"
"602","CHELTUIELI CU MATERIALELE CONSUMABILE"
"6021","CHELTUIELI  CU MATERIALE AUXILIARE"
"6022","CHELTUIELI  PRIVIND COMBUSTIBILUL"
"6023","CHELTUIELI  PRIVIND AMBALAJUL"
"6024","CHELTUIELI  CU PIESELE DE SCHIMB"
"6025","CHELTUIELI  CU SEMINTE SI MAT. PLANT."
"6026","CHELTUIELI  CU FURAJELE"
"6028","CHELTUIELI CU ALTE MAT.CONSUMABILE"
"603","CHELTUIELI  CU OBIECTE DE INVENTAR"
"604","CHELTUIELI  CU MAT.NESTOCATE"
"605","CHELTUIELI  CU ENERGIA SI APA"
"6051","CHELTUIELI  PRIVIND CONSUMUL DE ENERGIE"
"6052","CHELTUIELI  PRIVIND CONSUMUL DE APA"
"6053","CHELTUIELI  PRIVIND CONSUMUL DE GAZE NATURALE"
"6058","CHELTUIELI  CU ALTE UTILITATI"
"606","CHELTUIELI  CU PRIVIND ACTIVELE BIOLOGICE DE NATURA STOCURILOR"
"607","CHELTUIELI  PRIVIND MARFURILE"
"608","CHELTUIELI  PRIVIND AMBALAJELE"
"609","REDUCERI COMERCIALE PRIMITE"
"611","CHELTUIELI  CU INTRETINEREA SI REPARATIILE"
"612","CHELTUIELI  CU REDEVENTE, LOCATIILE DE GESTIUNE SI CHIRIILE"
"6121","CHELTUIELI CU REDEVENTELE"
"6122","CHELTUIELI CU LOCATIILE DE GESTIUNE"
"6123","CHELTUIELI CU CHIRIILE"
"613","CHELTUIELI  CU PRIME DE ASIGURARE"
"614","CHELTUIELI  CU STUDII SI CERCETARI"
"615","CHELTUIELI  CU PREGATIREA PERSONALULUI"
"616","CHELTUIELI AFERENTE DREPTURILOR DE PROPRIETATE INTELECTUALA"
"617","CHELTUIELI DE MANAGEMENT"
"618","CHELTUIELI DE CONSULTANTA"
"621","CHELTUIELI  CU COLABORATORII"
"622","CHELTUIELI  CU COMISIOANE SI ONORARIILE"
"623","CHELTUIELI  DE PROTOCOL, RECLAMA SI PUBLICITATE"
"624","CHELTUIELI  CU TRANSPORTUL DE BUNURI SI PERSONAL"
"625","CHELTUIELI  CU DEPLASARI, DETASARI SI TRANSFERARI"
"626","CHELTUIELI  POSTALE SI TAXE DE TELECOMUNICATII"
"627","CHELTUIELI  CU SERV.BANCARE SI ASIMILATE"
"628","ALTE CHELTUIELI  CU SERVICIILE EXECUTATE DE TERTI"

Vei primi in format JSON un array de obiecte conform structurii: [{id:1,continut:'Servicii telefonie',cont:''}...]
Trebuie sa raspunzi STRICT in format JSON fara niciun alt text , doar obiectul JSON, returnind acelasi array de obiecte, pastrind strict aceasi structura numai ca vei completa cimpul 'cont' din fiecare obiect din array cu simbolul contului asa cum il incadrezi tu.
Fii analitic, incearca sa intuiesti corect categoria din care face parte bunul sau serviciul iar daca nu reusesti sa identifici o categorie foloseste contul "628".
`
const userprompt=`
Completeaza conturile conform instructiunilor si planului partial de conturi in setul de mai jos:
${JSON.stringify(conturi)}
`
let airesult=null
const modelai = params.tipai=='fastai'?'gpt-4o-mini':'gpt-4o'
if(params.tipai!=='noai'){
  const airesponse = await this.askAI(modelai,systemprompt,userprompt)

  try {
     airesult = this.validateJSONString(airesponse);
   // console.log("Valid JSON:", airesult);
  } catch (error) {
    console.error("Error:", error.message,airesponse);
  }
 
}
//const airesponse = await this.askAI('gpt-4o',systemprompt,userprompt)
  //   console.log(airesponse)

     lista[0].map(f=>{
      this.genFactura(xml,f,parametrii[0][0],airesult)
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

  private isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  private validateJSONString(str) {
    if (this.isValidJSON(str)) {
      return JSON.parse(str);
    } else {
      throw new Error("Invalid JSON string");
    }
  }

  private genFactura(root,data,params,airesult){
     const factura=root.ele('Factura')
     this.genAntet(factura,data)
    const continut= factura.ele('Detalii').ele('Continut')
    const itemi=JSON.parse(data.itemi)
    if(params.contdebitimplicit=='371.001'&&!airesult){
    // console.log('Factura linii cumulate')
    } else {
      itemi.map(item=>{
        this.genLinie(continut,item,{params,data},airesult)
     })
    }
 

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
 
      const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: systemprompt },{role:"user", content:userprompt}],
          model: model,
        });
  
       return completion.choices[0].message.content;
  
  }

  private genLinie(root,data,context,airesult){
   // console.log('linie',airesult&&context.data.tip=='FACTURA PRIMITA'?airesult.filter(item=>item.id==context.data.id)[0]['cont']:{})
    const linie = root.ele('Linie')
    let cantitate=parseFloat(data.cantitate)
    let pret=(parseFloat(data.pret)*(100+parseInt(data.tva))/100)
    let valoare=(parseFloat(data.cantitate)*parseFloat(data.pret))

    linie.ele('LinieNrCrt').dat(data.nrcrt)
    linie.ele('Descriere').dat(data.denumire)
    linie.ele('Cont').dat(context.data.tip=='FACTURA PRIMITA'?airesult?airesult.filter(item=>item.id==context.data.id)[0]['cont']:context.params.contdebitimplicit:context.params.contcreditimplicit)
    linie.ele('InformatiiSuplimentare').dat('Nedefinit')
    linie.ele('UM').dat('buc')
    linie.ele('Cantitate').dat(data.cantitate)
    linie.ele('Pret').dat((parseFloat(data.pret)*(100+parseInt(data.tva))/100).toFixed(2))
    linie.ele('Valoare').dat((parseFloat(data.cantitate)*parseFloat(data.pret)).toFixed(2))
    linie.ele('TVA').dat((cantitate*pret-valoare).toFixed(2))
   // console.log('Linie',data,cantitate,pret,valoare)
  }

  private genLinieCumulata(root,data,context){
    
  }
}