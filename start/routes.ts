import Route from '@ioc:Adonis/Core/Route'
import Redis from '@ioc:Adonis/Addons/Redis'

Route.get('/register', 'AuthController.showRegister').middleware('guest')
Route.post('/register', 'AuthController.register')
Route.post('/logout', 'AuthController.logout')
Route.get('/login', 'AuthController.showLogin').middleware('guest')
Route.post('/login', 'AuthController.login')

Route.on('/').render('home')
// Route.on('/').render('welcome')

// Products Routes
import './routes/product'
// Orders Routes
import './routes/order'
// Categories Routes
import './routes/category'
// Roles Routes
import './routes/role'
// Permissions Routes
import './routes/permission'
// Users Routes
import './routes/user'
