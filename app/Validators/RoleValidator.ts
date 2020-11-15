import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleValidator {
	constructor (protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		title: schema.string({ trim: true }, [
			rules.maxLength(255),
		]),
		permissions: schema.array.optional().members(schema.number()),
	})
  	public messages = {
		'title.required': 'Please Enter title value',
		'title.maxLength': 'The title value can not be more than 255 char',
		'permissions.required': 'Please Select permissions For The Role',
	}
}
