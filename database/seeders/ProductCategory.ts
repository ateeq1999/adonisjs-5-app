import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductCategorySeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const product_categories = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ]

    product_categories.forEach(async (element) => {
      await Database.table('product_categories')
                      .insert({ product_id: element.id, category_id: 1 })
    });
  }
}
