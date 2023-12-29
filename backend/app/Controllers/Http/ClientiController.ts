
//import Drive from '@ioc:Adonis/Core/Drive'

export default class ClientiController {


    public async uploadsigla({request,response}) {
        // console.log('Incercare upload',request.body())
 
         const sigla = request.file('sigla', {
           size: '1mb',
           extnames: ['jpg', 'png', 'jpeg','bmp'],
         })
     
         if(sigla){
           
            // console.log('Upload ok',fileName)
           await sigla.moveToDisk('./sigle/')
           const fileName = sigla.fileName;

     
           return response.send({
             message:'Succes',
             numefisier:fileName
           })
         }
       }
}