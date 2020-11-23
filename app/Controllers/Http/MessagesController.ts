import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Ws from 'App/Services/Ws'
import Redis from '@ioc:Adonis/Addons/Redis'
import Message from 'App/Models/Message'
import User from 'App/Models/User'

export default class MessagesController {
  public async index ({ view, auth, request }: HttpContextContract) {
    const driver = await User.findOrFail(2)
    return view.render('messages/index', { driver })
  }

  public async create ({ view, request, auth, params }: HttpContextContract) {

    // const room = { id: `${params.id}_and_${params.driver}`, user: params.id, driver: params.driver  }
    const room = { id: `1_and_2`, user: params.id, driver: params.driver  }

    const messages = await Database.from('messages')
                                    .where('room_id', room.id)
                                    .orderBy('created_at')

    return view.render('messages/chat', { room, messages })
  }

  public async store ({ request, response, session, auth }: HttpContextContract) {
    const validationSchema = schema.create({
      text: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      room_id: schema.string({ trim: true }, [
        rules.maxLength(255),
      ]),
      user_id: schema.number(),
      driver_id: schema.number(),
    })

    const validatedData = await request.validate({
      schema: validationSchema,
      messages: {
        'text.required': 'Enter message text',
        'text.maxLength': 'Message text can not exceed 255 character',
        'room_id.required': 'Please Enter {{ field }} value',
        'driver_id.required': 'Please Enter {{ field }} value',
      },
    })

    const data = {
      text: validatedData.text,
      room_id: `1_and_2`,
      // room_id: `${validatedData.user_id}_and_${validatedData.driver_id}`,
      user_id: validatedData.user_id,
      driver_id: validatedData.driver_id
    }

    await Redis.publish('new:message', JSON.stringify(data))

    const message = await auth.user?.related('messages').create(data)

    session.flash('notification', 'Message added!')

    return response.redirect('back')
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
