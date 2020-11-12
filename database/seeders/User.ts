import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    // await User.createMany([
    //   {
    //     email: 'admin@admin.com',
    //     password: 'password',
    //   },
    //   {
    //     email: 'demo@admin.com',
    //     password: 'password'
    //   }
    // ])
    // await UserFactory.createMany(5)
  }
}
