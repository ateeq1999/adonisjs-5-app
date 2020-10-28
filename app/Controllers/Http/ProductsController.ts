// import Cloudinary from 'App/Services/Cloudinary'
const fs = require('fs');

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'

export default class ProductsController {
    
    public async index({ view }: HttpContextContract) {

        const products = await Product.all()

        return view.render('products/index', { products })
    }

    public async show({ view, params }: HttpContextContract) {

        const product = await Product.findOrFail(params.id)

        product?.image_url = 'http://192.168.8.101:8080/' + product?.cover_image

        return view.render('products/show', { product })
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

        // let cloudinary_response = await Cloudinary.upload(`${Application.tmpPath('uploads')}/${imageName}`, 'products')

        await Product.create({
            name: data.name,
            cover_image: imageName,
        })

        await data.image.move(Application.tmpPath('uploads'), {
            name: `${imageName}`,
        })

        return response.redirect('back')
    }

    public async destory({ params, response, session }: HttpContextContract) {

        const product = await Product.findOrFail(params.id)

        const image = Application.tmpPath('uploads/') + product?.cover_image

        if(fs.existsSync(image)){
            // delete a file
            fs.unlinkSync(image);
        }

        await product.delete()

        session.flash('success', 'Product Deleted Successfuly')

        return response.redirect('products.index')

    }
    
}
