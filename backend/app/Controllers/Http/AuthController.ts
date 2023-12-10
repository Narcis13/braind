// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
import Encryption from '@ioc:Adonis/Core/Encryption'
import Env from '@ioc:Adonis/Core/Env'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class AuthController {

public async register({request,response}){
//console.log('register')
    const validare_user = schema.create(
        {
    
            
            rol:schema.string({trim:true}),
            telefon:schema.string({trim:true}),
            numeintreg:schema.string({trim:true}),
            password:schema.string({trim:true}),
            email:schema.string({trim:true},[rules.email()]),
            stare:schema.string.optional({trim:true}),
            urlverificare:schema.string.optional({trim:true}),
        }
    )

    try {
        const utilizator_validat = await request.validate({schema:validare_user});
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
    //console.log(email,password)
    try {
        const token = await auth.use('api').attempt(email, password,{
          expiresIn: '720 mins'
        })
        
        const loggeduser = await User.findBy('email',email)// aici trebuie sa ma intreb de stare ......
        if(loggeduser&&loggeduser.stare=="activ")
        return {succes:true,mesaj:'Utilizator autentificat cu succes',loggeduser,token}
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

}
