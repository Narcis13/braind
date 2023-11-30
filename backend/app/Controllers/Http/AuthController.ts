// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {

public async register({request,response}){

    console.log('Utilizator nou!',request.headers())
}    
}
