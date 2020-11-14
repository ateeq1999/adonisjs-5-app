import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RoleValidator from 'App/Validators/RoleValidator'
import Role from 'App/Models/Role'

export default class RolesController {
  public async index ({ view }: HttpContextContract) {
    const roles = await Role.all()

    return view.render('roles.index', { roles })
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('roles.create')
  }

  public async store ({ request, response, view, session }: HttpContextContract) {
    const data = await request.validate(RoleValidator)

    await Role.create(data)

    session.flash('success', 'Role Created Successfuly')

    return response.redirect('back')
  }

  public async show ({ request, response, params, view }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    return view.render('roles.show', { role })
  }

  public async edit ({ request, response, params, view }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    return view.render('roles.edit', { role })
  }

  public async update ({ request, response, params, session }: HttpContextContract) {
    const data = await request.validate(RoleValidator)

    const role = Role.findOrFail(params.id)

    await role.update(data)

    session.flash('success', 'Role Updated Successfuly')

    return response.redirect('back')
  }

  public async destroy ({ request, response, params, session }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    await role.delete()

    session.flash('success', 'Role Deleted Successfuly')

    return response.redirect('roles.index')
  }
}
