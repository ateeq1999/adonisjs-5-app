import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/products', 'ProductsController.index').as('products.index')
// .middleware('auth')
Route.get('/products/:id', 'ProductsController.show').as('products.show')
Route.delete('/products/:id', 'ProductsController.destory').as('products.delete')
Route.put('/products/:id', 'ProductsController.update').as('products.update')
Route.post('/products', 'ProductsController.store').as('products.store')
Route.get('/products/:id/categories', 'ProductsController.show_categories').as('products.show.categories')
