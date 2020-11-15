import Route from '@ioc:Adonis/Core/Route'

Route.get('/categories', 'CategoriesController.index').as('categories.index')
Route.get('/create/categories', 'CategoriesController.create').as('categories.create')
Route.post('/categories', 'CategoriesController.store').as('categories.store')
Route.get('/categories/:id', 'CategoriesController.show').as('categories.show')
Route.delete('/categories/:id', 'CategoriesController.destory').as('categories.delete')
Route.put('/categories/:id', 'CategoriesController.update').as('categories.update')
