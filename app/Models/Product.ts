import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
// import Application from '@ioc:Adonis/Core/Application'
// const path = require('path')

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cover_image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // public getImage(){
  //   const i = path.join(__dirname, '../tmp/uploads/')
  //   return this.cover_image
  // }
}
