import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/roles', 'RolesController.index').as('roles.index')
// .middleware('auth')
Route.get('/roles/:id', 'RolesController.show').as('roles.show')
Route.delete('/roles/:id', 'RolesController.destroy').as('roles.delete')
Route.put('/roles/:id', 'RolesController.update').as('roles.update')
Route.post('/roles', 'RolesController.store').as('roles.store')
Route.get('/roles/:id/users', 'RolesController.show_categories').as('roles.show.users')
