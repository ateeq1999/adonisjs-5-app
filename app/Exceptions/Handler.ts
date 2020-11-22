/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '404': 'errors.not-found',
    '500..599': 'errors.server-error',
  }

  constructor () {
    super(Logger)
  }

  public async handle (error, ctx) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send(error.messages)
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.redirect('back')
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.status(404).send(error.messages)
    }

    if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
      return ctx.response.status(404).send(error.messages)
    }

    if (error.code === 'ER_DATA_TOO_LONG') {
      return ctx.response.status(404).send(error.messages)
    }

    return super.handle(error, ctx)
  }
}
