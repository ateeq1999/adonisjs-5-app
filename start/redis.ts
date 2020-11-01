/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Redis from '@ioc:Adonis/Addons/Redis'

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
