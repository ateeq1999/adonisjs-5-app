import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionValidator from 'App/Validators/PermissionValidator'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  public async index ({ view }: HttpContextContract) {
    const permissions = await Permission.all()

    return view.render('permissions.index', { permissions })
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('permissions.create')
  }

  public async store ({ request, response, session }: HttpContextContract) {
    const data = await request.validate(PermissionValidator)

    await Permission.create(data)

    session.flash('success', 'Permission Created Successfuly')

    return response.redirect('back')
  }

  public async show ({ params, view }: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id)

    return view.render('permissions.show', { permission })
  }

  public async edit ({ params, view }: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id)

    return view.render('permissions.edit', { permission })
  }

  public async update ({ request, response, params, session }: HttpContextContract) {
    const data = await request.validate(PermissionValidator)

    const permission = await Permission.findOrFail(params.id)

    permission.title = data.title

    await permission.save()

    session.flash('success', 'Permission Updated Successfuly')

    return response.redirect('back')
  }

  public async destroy ({ response, params, session }: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id)

    await permission.delete()

    session.flash('success', 'Permission Deleted Successfuly')

    return response.redirect('permissions.index')
  }
}
