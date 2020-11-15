import Route from '@ioc:Adonis/Core/Route'

Route.get('/users', 'UsersController.index').as('users.index')
Route.get('/users/:id', 'UsersController.show').as('users.show')
Route.delete('/users/:id', 'UsersController.destroy').as('users.delete')
Route.put('/users/:id', 'UsersController.update').as('users.update')
Route.post('/users', 'UsersController.store').as('users.store')
Route.get('/create/users', 'UsersController.create').as('users.create')



