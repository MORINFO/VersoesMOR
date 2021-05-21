import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Versoes extends BaseModel {
  @column({ isPrimary: true })
  public codigo: number

  @column()
  public empresa: string

  @column()
  public faturamento: string

  @column()
  public financeiro: string

  @column()
  public compras: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
