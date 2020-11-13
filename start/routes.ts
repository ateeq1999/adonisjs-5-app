import Route from '@ioc:Adonis/Core/Route'
import Redis from '@ioc:Adonis/Addons/Redis'
import Product from 'App/Models/Product'
import Category from 'App/Models/Category'
import Database from '@ioc:Adonis/Lucid/Database'

Route.get('/signup', async () => {
  await Redis.publish('music', JSON.stringify({ name: 'Track 1' }))
  await Redis.publish('user:signups', JSON.stringify({ id: 1 }))
  return 'handled'
})

Route.on('/').render('home')
// Route.on('/').render('welcome')

// Products Routes
import './product'
// Categories Routes
import './category'
