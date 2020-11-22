import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/messages', 'MessagesController.index').as('messages.index')
    Route.get('/messages/:id', 'MessagesController.show').as('messages.show')
    Route.delete('/messages/:id', 'MessagesController.destroy').as('messages.delete')
    Route.put('/messages/:id', 'MessagesController.update').as('messages.update')
    Route.post('/messages', 'MessagesController.store').as('messages.store')
    // Route.get('/messages/create', 'MessagesController.create').as('messages.create')
    Route.get('/messages/:id/chat/:driver', 'MessagesController.create').as('messages.create')
}).middleware('auth')



