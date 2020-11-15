import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import ProductValidator from 'App/Validators/ProductValidator'
import Product from 'App/Models/Product'
import Ws from 'App/Services/Ws'
import fs from 'fs'

export default class ProductsController {
    
    public async index({ view }: HttpContextContract) {

        const products = await Product.all()

        Ws.io.emit('product-created', { event: "product-created", data: products })

        return view.render('products/index', { products })
    }

    public async show({ view, params }: HttpContextContract) {

        const product = await Product.findOrFail(params.id)

        await product.preload('categories')

        return view.render('products/show', { product })
    }

    public async store({ request, response }: HttpContextContract) {

        const data = await request.validate(ProductValidator)

        const imageName = `${new Date().getTime()}.${data.image.extname}`

        // let cloudinary_response = await Cloudinary.upload(`${Application.tmpPath('uploads')}/${imageName}`, 'products')

        await Product.create({
            name: data.name,
            cover_image: imageName,
        })

        await data.image.move(Application.tmpPath('uploads/products'), {
            name: `${imageName}`,
        })

        return response.redirect('back')
    }

    public async destory({ params, response, session }: HttpContextContract) {

        const product = await Product.findOrFail(params.id)

        return response.status(200).json(product)

        const image = Application.tmpPath('uploads/products') + product?.cover_image

        if(fs.existsSync(image)){
            // delete a file
            fs.unlinkSync(image);
        }

        await product.delete()

        session.flash('success', 'Product Deleted Successfuly')

        return response.redirect('products.index')

    }
    
}
