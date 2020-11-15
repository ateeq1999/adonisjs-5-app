import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
// import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class ProductCategorySeeder extends BaseSeeder {
  public async run () {
    const product = await Product.findOrFail(1)

    await product.related('categories').attach([1,2,3,4,5])
  }
}
