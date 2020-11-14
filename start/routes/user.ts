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

Route.get('/users/:id/roles', async ({ params, request }) => {
    const data = await Database.table('role_user')
                    .insert({ user_id: params.id, role_id: request.role_id })
    return data;
})

Route.get('/test', async ({ params, request}) => {
    // const roles = await RoleFactory.createMany(5)
    const user = await User.find(1)
    // const role = await Role.find(2)
    const roles = await Role.all()
    // // role.name = 'Programming'

    // await user.related('roles').save(role)

    await user.related('roles').detach()

    for (let role of Object.values(roles)) {
        await user.related('roles').save(role)
    }

    // or saveMany
    // const data = roles.forEach(({role}) => {
    //    return await user.related('roles').sync([role.id])
    // });

    // return roles
    return {
        user,
        data: Object.values(roles)
    }
})


