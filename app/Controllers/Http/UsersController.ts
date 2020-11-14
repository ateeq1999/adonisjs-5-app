import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class UsersController {
    public async index ({ request, response, view }: HttpContextContract) {

        const users = await User.query().preload('roles').all()


        return response.status(200).json(users)

        // return view.render('users.index', { users })
    }

    public async store ({ request, response, view }: HttpContextContract) {

        const data = request.validate(UserValidator)

        if(data.roles){
            for (let role of Object.values(roles)) {
                await user.related('roles').save(role)
            }
        }

        return response.status(200).json({
            data: user
        })
    }
}
