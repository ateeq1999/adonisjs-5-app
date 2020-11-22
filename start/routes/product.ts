import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/products', 'ProductsController.index').as('products.index')
    Route.get('/products/:id', 'ProductsController.show').as('products.show')
    Route.delete('/products/:id', 'ProductsController.destory').as('products.delete')
    Route.put('/products/:id', 'ProductsController.update').as('products.update')
    Route.post('/products', 'ProductsController.store').as('products.store')
    Route.get('/create/products', 'ProductsController.create').as('products.create')
}).middleware('auth')
