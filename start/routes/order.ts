import Route from '@ioc:Adonis/Core/Route'

Route.get('/orders', 'OrdersController.index').as('orders.index')
Route.get('/orders/:id', 'OrdersController.show').as('orders.show')
Route.delete('/orders/:id', 'OrdersController.destroy').as('orders.delete')
Route.put('/orders/:id', 'OrdersController.update').as('orders.update')
Route.post('/orders', 'OrdersController.store').as('orders.store')
Route.get('/create/orders', 'OrdersController.create').as('orders.create')
