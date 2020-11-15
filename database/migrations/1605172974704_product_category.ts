import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductCategory extends BaseSchema {
  protected tableName = 'product_category'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE')
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
