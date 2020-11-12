import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Product from 'App/Models/Product'
import Category from 'App/Models/Category'

const randFunction = (value) => {
    return Math.floor(Math.random() * Math.floor(value))
}

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      username: faker.internet.userName,
      email: faker.internet.email,
      password: faker.internet.password,
    }
  })
  .build()

  export const CategoryFactory = Factory
  .define(Category, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      is_active: randFunction(2)
    }
  })
//   .relation('products', () => ProductFactory)
  .build()

export const ProductFactory = Factory
  .define(Product, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      price:  randFunction(10000),
      quantity:  randFunction(50),
      is_active: randFunction(2)
    }
  })
//   .relation('categories', () => CategoryFactory)
  .build()


