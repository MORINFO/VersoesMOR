import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Empresas extends BaseSchema {
  protected tableName = 'empresas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('codigo')
      table.string('nomefantasia').notNullable().unique()
      table.enu('utilizafaturamento', ['S', 'N']).notNullable().defaultTo('N')
      table.enu('utilizafinanceiro', ['S', 'N']).notNullable().defaultTo('N')
      table.enu('utilizacompras', ['S', 'N']).notNullable().defaultTo('N')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
