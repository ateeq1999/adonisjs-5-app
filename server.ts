import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core/build/standalone'

new Ignitor(__dirname)
  .httpServer()
  .start()
