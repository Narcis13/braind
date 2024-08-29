import Database from '@ioc:Adonis/Lucid/Database'



export default class MesajePreluateController {

    public async printfactura({view,params}){

       let sql=`
       SELECT * from cdata.mesajepreluate mp

            where mp.id=${params.id};
       `;

       let lista = await  Database.rawQuery(sql)
     //  const json=JSON.parse(lista[0].itemi)
       lista[0][0].itemi=JSON.parse(lista[0][0].itemi)
      //  console.log(lista[0][0].itemi) 

        return view.render('facturipreluate/model1',{factura:lista[0][0]})
      // return {}
    }

}