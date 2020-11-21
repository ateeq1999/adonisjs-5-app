import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrderValidator from 'App/Validators/OrderValidator'
import Order from 'App/Models/Order'
import Ws from 'App/Services/Ws'
import Redis from '@ioc:Adonis/Addons/Redis'

export default class OrdersController {
  public async index ({ view }: HttpContextContract) {
    const orders = await Order.all()

    Ws.io.on('order_created', () => {
      Ws.io.emit('new-order', { event: "order-created", data: orders })
    })


    return view.render('orders/index', { orders })
  }

  public async create ({ view }: HttpContextContract) {
    return view.render('orders/create')
  }

  public async store ({ request, response, session }: HttpContextContract) {
    const data = await request.validate(OrderValidator)

    const order = await Order.create({
      title: data.title
    })

    // Publish data to the new:orders channel
    // await Redis.set(`order_number_${order.id}`, JSON.stringify(order) )
    await Redis.publish('new:orders', JSON.stringify(order))

    session.flash('success', 'Order Created Successfuly')

    return response.redirect('orders')
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
