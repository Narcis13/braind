import Env from '@ioc:Adonis/Core/Env'
const axios = require('axios');
//import Drive from '@ioc:Adonis/Core/Drive'

export default class ClientiController {


    public async uploadsigla({request,response}) {
        // console.log('Incercare upload',request.body())
 
         const sigla = request.file('sigla', {
           size: '1mb',
           extnames: ['jpg', 'png', 'jpeg','bmp'],
         })
       //  console.log('incerc upload',sigla)
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

    public async partenerinfo({request}){
      const {cui} = request.body()
      const key= Env.get("OPENAPI_KEY")
      var options = {
      //  method: 'POST',
      //  url: `https://api.openapi.ro/api/companies/${cui}`,
        headers: {
          'Accept': '*/*',
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
          'x-api-key': key
        }
      };
     
      const response = await axios.get(`https://api.openapi.ro/api/companies/${cui}`,options) 
      // console.log('ajung in partener info',response)
      let partener={}
      if (!response.error){
        partener = {
          denumire:response.data.denumire,
          adresa:response.data.adresa,
          judet:response.data.judet.toUpperCase(),
          regcom:response.data.numar_reg_com||null,
          platitortva:response.data.tva!==null
        }
      }

     // console.log(partener)
      return { partener}
    }   
}