import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RoleValidator from 'App/Validators/RoleValidator'
import Role from 'App/Models/Role'
import Permission from 'App/Models/Permission'

export default class RolesController {
  public async index ({ view, response }: HttpContextContract) {
    const roles = await Role.query().preload('permissions').preload('users')

    return response.json({ roles })
    return view.render('roles.index', { roles })
  }

  public async create ({ view }: HttpContextContract) {
    const permissions = await Permission.all()

    return view.render('roles.create', { permissions })
  }

  public async store ({ request, response, view, session }: HttpContextContract) {
    const data = await request.validate(RoleValidator)

    const role = await Role.create({
      title: data.title
    })

    if(data.permissions){
      await role.related('permissions').attach(data.permissions)
    }

    session.flash('success', 'Role Created Successfuly')

    return response.redirect('roles.index')
  }

  public async show ({ request, response, params, view }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)

    await role.preload('permissions')

    return view.render('roles.show', { role })
  }

  public async edit ({ request, response, params, view }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    
    await role.preload('permissions')
    // .preload('users')

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
