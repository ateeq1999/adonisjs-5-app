import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrderValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		title: schema.string({ trim: true }, [
			rules.maxLength(255),
		]),
	})
	
  	public messages = {
		'title.required': 'Please Enter title value',
		'title.maxLength': 'The title value can not be more than 255 char',
	}
}
