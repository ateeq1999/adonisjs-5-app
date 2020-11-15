import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/Role'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Role, {
    localKey: 'id',
    pivotForeignKey: 'permission_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'role_id',
    pivotTable: 'role_permission',
  })

  public roles: ManyToMany<typeof Role>
}
