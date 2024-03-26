
import Database from '@ioc:Adonis/Lucid/Database'

export default class FacturiEmiseController {

    public async printfactura({view,params}){
       let lista = await  Database.rawQuery('select * from cdata.Firme')
        console.log(lista[0]) 
        return view.render('femise/model1')
    }

}