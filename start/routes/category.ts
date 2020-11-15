import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/categories', 'CategoriesController.index').as('categories.index')
// .middleware('auth')
Route.get('/categories/:id', 'CategoriesController.show').as('categories.show')
Route.delete('/categories/:id', 'CategoriesController.destory').as('categories.delete')
Route.put('/categories/:id', 'CategoriesController.update').as('categories.update')
Route.post('/categories', 'CategoriesController.store').as('categories.store')
Route.get('/categories/:id/products', 'CategoriesController.show_products').as('categories.show.products')
