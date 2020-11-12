import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  public async index ({ response }: HttpContextContract) {
    const categories = await Category.all()

    return response.status(200).json(categories)
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(CategoryValidator)

    const imageName = `${new Date().getTime()}.${data.image.extname}`

    const category = await Category.create({
        name: data.name,
        cover_image: imageName,
        is_active: data.is_active,
    })

    await data.image.move(Application.tmpPath('uploads/categories'), {
        name: `${imageName}`,
    })

    return response.status(201).json(category)
  }

  public async show ({ response, request, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    return reponse.status(200).json(category)
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const data = await request.validate(CategoryValidator)

    const imageName = `${new Date().getTime()}.${data.image.extname}`

    const category = await Category.findOrFail(params.id)

    category.update({
      name: data.name,
      cover_image: imageName,
      is_active: data.is_active,
    })

    await data.image.move(Application.tmpPath('uploads/categories'), {
      name: `${imageName}`,
    })

    return response.status(201).json(category)
  }

  public async destroy ({ request, params, response }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    const image = Application.tmpPath('uploads/categories') + category?.cover_image

    if(fs.existsSync(image)){
        // delete a file
        fs.unlinkSync(image);
    }

    await category.delete()

    session.flash('success', 'Category Deleted Successfuly')

    return response.status(203).json({
      msg: "Category Deleted",
      seccess: true
    })
  }
}
