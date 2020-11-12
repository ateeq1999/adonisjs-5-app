import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProductFactory } from 'Database/factories'

export default class ProductSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await ProductFactory.createMany(5)
  }
}
