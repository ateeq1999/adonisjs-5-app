import Route from '@ioc:Adonis/Core/Route'
import Redis from '@ioc:Adonis/Addons/Redis'

Route.get('/signup', async () => {
  await Redis.publish('music', JSON.stringify({ name: 'Track 1' }))
  await Redis.publish('user:signups', JSON.stringify({ id: 1 }))
  return 'handled'
})

Route.on('/').render('home')
// Route.on('/').render('welcome')

// Products Routes
import './routes/product'
// Categories Routes
import './routes/category'
// Roles Routes
import './routes/role'
// Permissions Routes
import './routes/permission'
// Users Routes
import './routes/user'
