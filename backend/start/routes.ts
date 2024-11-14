/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})
Route.post('/resetpwd/:userid','AuthController.resetpwd')
Route.post('/femise/toateinperioada','FacturiEmiseController.toateFacturilePerioadeiCurente')
Route.get('/femise/trimite/:id/:userid','FacturiEmiseController.trimitefactura')
Route.get('/femise/verifica/:id/:userid','FacturiEmiseController.verificafactura')
Route.get('/femise/descarca/:id/:userid/:idsolicitare','FacturiEmiseController.descarcafactura')
Route.get('/femise/listamesaje/:cif/:userid','FacturiEmiseController.listamesaje')
Route.post('/femise/listamesajepaginatie','FacturiEmiseController.listamesajepaginatie')

Route.get('/femise/xmlfactura/:id','FacturiEmiseController.xmlfactura')
Route.get('/exportsaga/:cui/:luna/:tipai','ExportSAGAController.transformToXml')
Route.get('/femise/:idf','FacturiEmiseController.printfactura')
Route.get('/mesajepreluate/:id','MesajePreluateController.printfactura')
Route.post('/registeruser','AuthController.register')
Route.post('/login','AuthController.login')
Route.post('/logout','AuthController.logout')
Route.get('/validemail', 'AuthController.validezemail')
Route.post('/smstrimiterecod/:key','AuthController.trimitere_cod_sms')
Route.post('/validezcodsms','AuthController.validezcodsms')


Route.post('/uploadsigla','ClientiController.uploadsigla')
Route.post('/partenerinfo','ClientiController.partenerinfo')