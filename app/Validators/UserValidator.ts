import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
	constructor (protected ctx: HttpContextContract) {
	}
	public schema = schema.create({
		name: schema.string({ trim: true }, [
			rules.maxLength(255),
		]),
		email: schema.string({ trim: true }, [
			rules.maxLength(255),
		]),
		phone: schema.string({ trim: true }, [
			rules.maxLength(255),
		]),
		password: schema.string({ trim: true }, [
			rules.maxLength(255),
		]),
		roles: schema.array.optional().members(schema.number()),
	})
  	public messages = {
		'name.required': 'Please Enter {{ field }} value',
		'email.required': 'Please Enter {{ field }} value',
		'phone.required': 'Please Enter {{ field }} value',
		'password.required': 'Please Enter {{ field }} value',
		'name.maxLength': 'The name value can not be more than 255 char',
		'roles.required': 'Please Select roles For The User',
	}
}
