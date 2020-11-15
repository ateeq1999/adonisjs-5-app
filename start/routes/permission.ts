import Route from '@ioc:Adonis/Core/Route'

Route.get('/permissions', 'PermissionsController.index').as('permissions.index')
Route.get('/permissions/:id', 'PermissionsController.show').as('permissions.show')
Route.delete('/permissions/:id', 'PermissionsController.destroy').as('permissions.delete')
Route.put('/permissions/:id', 'PermissionsController.update').as('permissions.update')
Route.post('/permissions', 'PermissionsController.store').as('permissions.store')
Route.get('/create/permissions', 'PermissionsController.create').as('permissions.create')
