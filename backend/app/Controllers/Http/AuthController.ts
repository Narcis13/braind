// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {rules , schema} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class AuthController {

public async register({request,response}){

    const validare_user = schema.create(
        {
    
            
            rol:schema.string({trim:true}),
            numeintreg:schema.string({trim:true}),
            password:schema.string({trim:true}),
            email:schema.string({trim:true},[rules.email()]),
            stare:schema.string.optional({trim:true})
            
        }
    )

    try {
        const utilizator_validat = await request.validate({schema:validare_user});

        const utilizator = await User.create(utilizator_validat);
    
        return utilizator;
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

public async logout({auth}){
    await auth.use('api').revoke()
    return {
      revoked: true
    }
}

}
