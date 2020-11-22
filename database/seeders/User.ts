import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@admin.com',
        phone: '0991612921',
        password: 'password',
      },
      {
        name: 'demo',
        email: 'demo@admin.com',
        phone: '0920543273',
        password: 'password'
      }
    ])
    await UserFactory.createMany(5)
  }
}
