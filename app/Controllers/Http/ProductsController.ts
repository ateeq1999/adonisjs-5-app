// import Cloudinary from 'App/Services/Cloudinary'
const fs = require('fs');

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import ProductValidator from 'App/Validators/ProductValidator'
import Redis from '@ioc:Adonis/Addons/Redis'
import Ws from 'App/Services/Ws'

export default class ProductsController {
    
    public async index({ view }: HttpContextContract) {

        const products = await Product.all()

        Ws.io.emit('product-created', { event: "product-created", data: products })

        return view.render('products/index', { products })
    }

    public async show({ view, params }: HttpContextContract) {

        const product = await Product.findOrFail(params.id)

        await Redis.set('foo', 'bar')
        const foo = await Redis.get('foo')

        product?.image_url = ' http://192.168.43.199:8080/' + product?.cover_image

        return view.render('products/show', { product, foo })
    }

    public async store({ request, response }: HttpContextContract) {

        const data = await request.validate(ProductValidator)

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

        return response.status(200).json(product)

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
