import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Role from 'App/Models/Role'
import { UserFactory, RoleFactory } from 'Database/factories'

Route.get('/users', 'UsersController.index').as('users.index')
// .middleware('auth')
Route.get('/users/:id', 'UsersController.show').as('users.show')
Route.delete('/users/:id', 'UsersController.destroy').as('users.delete')
Route.put('/users/:id', 'UsersController.update').as('users.update')
Route.post('/users', 'UsersController.store').as('users.store')
Route.get('/users/:id/users', 'UsersController.show_roles').as('users.show.roles')



