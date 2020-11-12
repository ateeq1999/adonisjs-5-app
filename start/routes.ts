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
import Redis from '@ioc:Adonis/Addons/Redis'
import { UserFactory, ProductFactory } from 'Database/factories'

Route.get('/signup', async () => {
  await Redis.publish('music', JSON.stringify({ name: 'Track 1' }))
  await Redis.publish('user:signups', JSON.stringify({ id: 1 }))
  return 'handled'
})

Route.on('/').render('welcome')

Route.get('/products', 'ProductsController.index').as('products.index')
// .middleware('auth')
Route.get('/products/:id', 'ProductsController.show').as('products.show')
Route.delete('/products/:id', 'ProductsController.destory').as('products.delete')
Route.put('/products/:id', 'ProductsController.update').as('products.update')
Route.post('/products', 'ProductsController.store').as('products.store')

Route.get('/test', async function () {
  // const product = await ProductFactory.merge({ name: 'product' + ' ' + Math.floor(Math.random() * Math.floor(50)) }).create()
  const product = await ProductFactory.create()

  return product;
})
