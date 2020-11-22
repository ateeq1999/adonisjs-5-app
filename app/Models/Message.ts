import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, scope } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public text: string

  @column()
  public roomId: string

  @column()
  public userId: number

  @column()
  public driverId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static messages = scope((query, user: User, driver_id: number) => {
    // query.where('from_id', user.id)
    query.where('room_id', `${user.id}_and_${driver_id}`)
  })
}
