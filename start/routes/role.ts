import Route from '@ioc:Adonis/Core/Route'


Route.group(() => {
    Route.get('/roles', 'RolesController.index').as('roles.index')
    Route.get('/roles/:id', 'RolesController.show').as('roles.show')
    Route.delete('/roles/:id', 'RolesController.destroy').as('roles.delete')
    Route.put('/roles/:id', 'RolesController.update').as('roles.update')
    Route.post('/roles', 'RolesController.store').as('roles.store')
    Route.get('/create/roles', 'RolesController.create').as('roles.create')
}).middleware('auth')
