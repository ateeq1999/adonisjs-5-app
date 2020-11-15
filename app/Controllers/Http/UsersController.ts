import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UsersController {
    public async index ({ view }: HttpContextContract) {

        const users = await User.query().preload('roles')


        return view.render('users.index', { users })
    }

    public async create ({ view }: HttpContextContract) {

        const roles = await Role.all()


        return view.render('users.create', { roles })

    }

    public async store ({ request, response }: HttpContextContract) {

        const data = await request.validate(UserValidator)

        const user = await User.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password
        })

        if(data.roles){
            await user.related('roles').attach(data.roles)
        }

        return response.redirect('users.index')
    }
}
