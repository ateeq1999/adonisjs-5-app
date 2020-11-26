import Route from '@ioc:Adonis/Core/Route'

Route.get('/register', 'AuthController.showRegister').middleware('guest')
Route.post('/register', 'AuthController.register')
Route.post('/logout', 'AuthController.logout')
Route.get('/login', 'AuthController.showLogin').middleware('guest')
Route.post('/login', 'AuthController.login')
Route.post('/drivers/login', 'AuthController.driver_login').middleware('guest')

Route.on('/').render('home').middleware('auth')
Route.on('/site').render('welcome')
Route.on('/dashboard').render('dashboard')

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
// Messages Routes
import './routes/message'
