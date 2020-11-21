import Ws from 'App/Services/Ws'
// import Redis from '@ioc:Adonis/Addons/Redis'

// Subscibe to new:orders channel
// Redis.subscribe('new:orders', (data: Object) => {
//     // emit an event at the socket
//     Ws.io.emit('new-order', JSON.parse(data))
// })

Ws.start((socket) => {
    socket.emit('news', { hello: 'test the news evev=nt' })

    socket.on('client_event', (data) => {
        console.log(data)
    })

    socket.on('order_created', (socket) => {
        socket.emit('order_created_drivers')
    })

    socket.on('new-order', (data) => {
        console.log('new order', data)
    })
    
    socket.on('product-created', (data) => {
        console.log(data)
    })
})