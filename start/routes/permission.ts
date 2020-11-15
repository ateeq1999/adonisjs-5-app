import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/permissions', 'PermissionsController.index').as('permissions.index')
// .middleware('auth')
Route.get('/permissions/:id', 'PermissionsController.show').as('permissions.show')
Route.delete('/permissions/:id', 'PermissionsController.destroy').as('permissions.delete')
Route.put('/permissions/:id', 'PermissionsController.update').as('permissions.update')
Route.post('/permissions', 'PermissionsController.store').as('permissions.store')
Route.get('/permissions/:id/roles', 'PermissionsController.show_roles').as('permissions.show.roles')
