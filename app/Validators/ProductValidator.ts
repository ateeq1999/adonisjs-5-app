import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	public schema = schema.create({
		name: schema.string({ trim: true }, [
			rules.maxLength(255),
		]),
		image: schema.file({
			size: '2mb',
			extnames: ['jpg', 'png', 'jpeg'],
		}),
	})
  	public messages = {
		'name.required': 'Please Enter name value',
		'name.maxLength': 'The name value can not be more than 255 char',
		'image.file.extname': 'You can only upload images',
		'image.file.size': 'Image size must be under 2mb',
	}
}
