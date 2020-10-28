import Cloudinary from 'App/Services/Cloudinary'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'

console.log(Cloudinary)

export default class ProductsController {
    
    public async index({ view }: HttpContextContract) {

        const products = await Product.all()

        return view.render('products/index', { products })
    }

    public async show({ view, params }: HttpContextContract) {

        const product = await Product.find(params.id)

        const url = Application.tmpPath('uploads/');

        product?.image_url = url + product?.cover_image

        return view.render('products/show', { product, url })
    }

    public async store({ request, response }: HttpContextContract) {

        const validationSchema = schema.create({
            name: schema.string({ trim: true }, [
                rules.maxLength(255),
            ]),
            image: schema.file({
                size: '2mb',
                extnames: ['jpg', 'png', 'jpeg'],
            }),
        })

        const data = await request.validate({
            schema: validationSchema,
            messages: {
                'name.required': 'Please Enter name value',
                'name.maxLength': 'The name value can not be more than 255 char',
                'image.file.extname': 'You can only upload images',
                'image.file.size': 'Image size must be under 2mb',
            }
        })

        const imageName = `${new Date().getTime()}.${data.image.extname}`

        await data.image.move(Application.tmpPath('uploads'), {
            name: `${imageName}`,
        })

        let cloudinary_response = await Cloudinary.upload(`${Application.tmpPath('uploads')}/${imageName}`, 'products')

        await Product.create({
            name: data.name,
            cover_image: cloudinary_response.url,
        })

        return response.redirect('back')
    }
    
}
