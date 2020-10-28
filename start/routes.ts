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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/test').render('welcome')

Route.get('/', 'ProductsController.index').as('products.index')
Route.get('/products/:id', 'ProductsController.show').as('products.show')
Route.delete('/products/:id', 'ProductsController.destory').as('products.delete1')
// Route.post('/products/:id', 'ProductsController.destory').as('products.delete')
Route.post('/products', 'ProductsController.store').as('products.store')
