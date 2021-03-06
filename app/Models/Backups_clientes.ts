import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Backups_clientes extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public empresa: string

  @column()
  public horario: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
