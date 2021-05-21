import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Versoes extends BaseSchema {
  protected tableName = 'versoes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('codigo')
      table.string('empresa').notNullable().unique()
      table.string('versaofaturamento').defaultTo(0)
      table.string('versaofinanceiro').defaultTo(0)
      table.string('versaocompras').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
