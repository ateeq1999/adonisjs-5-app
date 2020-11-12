import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Product from 'App/Models/Product'

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      username: faker.internet.userName,
      email: faker.internet.email,
      password: faker.internet.password,
    }
  })
  .build()

export const ProductFactory = Factory
  .define(Product, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      price:  Math.floor(Math.random() * Math.floor(10000), 2),
      quantity:  Math.floor(Math.random() * Math.floor(50)),
      is_active: Math.floor(Math.random() * Math.floor(2))
    }
  })
  .build()
