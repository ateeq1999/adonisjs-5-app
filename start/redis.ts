import Redis from '@ioc:Adonis/Addons/Redis'
import Ws from 'App/Services/Ws'

Redis.subscribe('user:signup', (user: string) => {
    console.log(JSON.parse(user))
})

Redis.psubscribe('music', (user: string) => {
    console.log(JSON.stringify(user))
})

Redis.psubscribe('user:*', (event: string, user: string) => {
    // console.log('from user.* psubscribe')
    console.log(event, JSON.stringify(user))
})

Redis.psubscribe('music', (event: string, message: string) => {
    console.log(event, JSON.stringify(message))
})

// Subscibe to new:orders channel
Redis.subscribe('new:orders', (data: Object) => {
    // emit an event at the socket
    Ws.io.emit('new-order', JSON.parse(data))
})
