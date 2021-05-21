import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Empresa extends BaseModel {
  @column({ isPrimary: true })
  public Codigo: number

  @column()
  public nomefantasia: string

  @column()
  public utilizafaturamento: string

  @column()
  public utilizafinanceiro: string

  @column()
  public utilizacompras: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
