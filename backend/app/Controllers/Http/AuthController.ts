// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
import Encryption from '@ioc:Adonis/Core/Encryption'
import Hash from '@ioc:Adonis/Core/Hash'
import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database';
const axios = require('axios');
export default class AuthController {


public async resetpwd({params,request}){
  console.log(params.userid,request.body())
  const pwd = request.body().pwd
  const user = await User.findOrFail(params.userid)
  const newpassword= await Hash.make(pwd)

await user
     .merge({password:pwd})
     .save()
    //user.password=pwd;

   return {status:'ok',newpassword}  
}  

public async register({request,response}){
//console.log('register')
    const validare_user = schema.create(
        {
    
            
            rol:schema.string({trim:true}),
            telefon:schema.string({trim:true}),
            numeintreg:schema.string({trim:true}),
            password:schema.string({trim:true}),
            email:schema.string({trim:true},[rules.email(),rules.unique({table:'users',column:'email'})]),
            stare:schema.string.optional({trim:true}),
            urlverificare:schema.string.optional({trim:true}),
        }
    )

    try {
        const utilizator_validat = await request.validate({schema:validare_user,messages:{
          'email.unique':'Cu aceasta adresa de email a fost deja creat un cont!'
        }});
        const url_verificare=Encryption.encrypt(utilizator_validat.email);/*Route.makeSignedUrl('verifyEmail', {
          email: utilizator_validat.email,
        })*/
        //console.log(utilizator_validat)
        utilizator_validat.urlverificare = url_verificare;
        const utilizator = await User.create(utilizator_validat);
        
        // generat link de trimis pe mail si chiar trimis pe mail
        const link_verificare = `${Env.get("SERVER_URL")}validemail?signature=${url_verificare}`;
        await Mail.send((message) => {
          message
            .from('programari@smupitesti.org')
            .to(utilizator_validat.email)
            .subject('Verificare email acces platforma brAInd.ro')
            .htmlView('emails/confirmare', { url:link_verificare , nume :utilizator_validat.numeintreg})
        })
        return {utilizator,succes:true};
      } catch (error) {
        response.send({errors:error.messages})
      }
}  

public async login ({auth,request}){
    const {email,password} = request.all()
    let arhitectura={}
    const modele = await Database.from('meta').select("*")
    modele.map(m=>{
      arhitectura[m.model]=m.descriere
    })
    //console.log(email,password)
    try {
        const token = await auth.use('api').attempt(email, password,{
          expiresIn: '720 mins'
        })
        
        const loggeduser = await User.findBy('email',email)// aici trebuie sa ma intreb de stare ......
        if(loggeduser&&loggeduser.stare=="activ")
        return {succes:true,mesaj:'Utilizator autentificat cu succes',loggeduser,token,arhitectura}
        else
          return{succes:false,mesaj:'Utilizator nu a putut fi autentificat!'}
      }
      catch (error) {
          return error;
      }
}

public async validezemail({request,view}){
  const signature = request.qs().signature
  const email = Encryption.decrypt(signature)
  const user = await User.findByOrFail("email",email)
  const client_url = Env.get("CLIENT_URL")
  if(user){
    await user.merge({stare:'activ'}).save()
    //console.log(email)
    return view.render('succesmailvalidare',{url:client_url+'autentificare'})
  }
 
}

public async logout({auth}){
    await auth.use('api').revoke()
    return {
      revoked: true
    }
}

public async validezcodsms({request}){
  const {cod,key} = request.all();
  //console.log(cod)
  const user = await User.findByOrFail("urlverificare",key)
  const match=user&&cod==user.telvalid
  if(match){
    await user.merge({telvalid:"13"}).save()
  }
 return {succes:match};
}

public async trimitere_cod_sms({params}){

  const key= params.key;
 
  const user = await User.findByOrFail("urlverificare",key)
  const random = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  const smskey= Env.get("SMS_KEY")
  let mesaj=`Codul pentru validarea numarului de telefon in platforma brAInd.ro este: ${random}`

  mesaj=mesaj.split(' ').join('%20')
  var options = {
    method: 'POST',
    url: `https://app.smso.ro/api/v1/send?to=%204${user.telefon}&sender=4&body=${mesaj}`,
    headers: {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      'X-Authorization': smskey
    }
  };
  if(user){

    await user.merge({telvalid:random.toString()}).save()

    try {

       axios.request(options)
      return {succes:true}

    } catch (error) {
      console.log(error);
    }
  }
  else {
    return {succes:false}
  }


}
}
