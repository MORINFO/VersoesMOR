import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Versoes extends BaseModel {
  @column({ isPrimary: true })
  public Codigo: number

  @column()
  public empresa: string

  @column()
  public versaofaturamento: string

  @column()
  public versaofinanceiro: string

  @column()
  public versaocompras: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
