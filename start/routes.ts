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
import Product from 'App/Models/Product'
import Category from 'App/Models/Category'
import { UserFactory, ProductFactory, CategoryFactory } from 'Database/factories'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/signup', async () => {
  await Redis.publish('music', JSON.stringify({ name: 'Track 1' }))
  await Redis.publish('user:signups', JSON.stringify({ id: 1 }))
  return 'handled'
})

Route.on('/').render('welcome')
// Products Routes
import './product'

Route.get('/test', async function () {
  // const product_categories = await Database
  //                       .from('product_categories')
  //                       .select('*')
                        // .where('product_id', 1)
                        // .innerJoin('categories', 'categories.id', 'product_categories.categorey_id')
                        // .first()
  // const product = await ProductFactory.merge({ name: 'product' + ' ' + Math.floor(Math.random() * Math.floor(50)) }).create()
  // const product = await ProductFactory.with('categories', 3).create()
  // const product = await ProductFactory.create()
  // const product = await ProductFactory.createMany(5)
  // const products = await Product.all()
  // const categories = await Category.all()
  // const product = await Product.query().preload('categories').first()
  // const categories = await CategoryFactory.create()
  const categories = await CategoryFactory.createMany(5)

  // await product.related('categories').save(categories)
  // await product.related('categories').saveMany([categories])

  const data = await Database
  // .insertQuery() // 👈 gives an instance of insert query builder
  .table('product_categories')
  .insert({ product_id: 1, category_id: 3 })

  return data;
  // return [ product_categories ];
  // return [ product_categories, products, categories ];
  return product;
  return products;
  return categories;
})
