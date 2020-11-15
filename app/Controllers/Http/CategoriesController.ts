import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Application from '@ioc:Adonis/Core/Application'
import CategoryValidator from 'App/Validators/CategoryValidator'
import fs from 'fs'

export default class CategoriesController {
  public async index ({ response }: HttpContextContract) {
    const categories = await Category.query().preload('products')

    return response.status(200).json(categories)
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('categories.create')
  }

  public async store ({ request, response }: HttpContextContract) {
    const data = await request.validate(CategoryValidator)

    const imageName = `${new Date().getTime()}.${data.cover_image.extname}`

    const category = await Category.create({
      name: data.name,
      cover_image: imageName,
      is_active: data.is_active,
    })

    await data.cover_image.move(Application.tmpPath('uploads/categories'), {
      name: `${imageName}`,
    })

    return response.status(201).json(category)
  }

  public async show ({ response, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    await category.preload('products')

    return response.status(200).json(category)
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const data = await request.validate(CategoryValidator)

    const category = await Category.findOrFail(params.id)

    if(data.cover_image!){

      category.name = data.name,
      category.is_active = data.is_active

    }else{

      const imageName = `${new Date().getTime()}.${data.cover_image.extname}`

      category.name = data.name,
      category.cover_image = imageName,
      category.is_active = data.is_active

      const image = Application.tmpPath('uploads/categories') + category.cover_image

      if(fs.existsSync(image)){
        // delete the image from the files
        fs.unlinkSync(image);
      }

      await data.cover_image.move(Application.tmpPath('uploads/categories'), {
        name: `${imageName}`,
      })
    }

    await category.save()

    return response.status(201).json(category)
  }

  public async destroy ({ params, response, session }: HttpContextContract) {
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
