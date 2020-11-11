import Ws from 'App/Services/Ws'

Ws.start((socket) => {
    socket.emit('news', { hello: 'test the news evev=nt' })

    socket.on('client_event', (data) => {
        console.log(data)
    })
    socket.on('product-created', (data) => {
        console.log(data)
    })
})