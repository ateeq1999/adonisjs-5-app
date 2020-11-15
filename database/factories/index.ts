import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Product from 'App/Models/Product'
import Category from 'App/Models/Category'
import Role from 'App/Models/Role'

const randFunction = (value) => {
  return Math.floor(Math.random() * Math.floor(value))
}

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      phone: '0991612921',
      password: faker.internet.password(),
    }
  })
  .build()

export const CategoryFactory = Factory
  .define(Category, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      is_active: false
    }
  })
  .build()

export const RoleFactory = Factory
  .define(Role, ({ faker }) => {
    return {
      title: faker.internet.userName(),
    }
  })
  // .relation('users', () => UserFactory)
  .build()

export const ProductFactory = Factory
  .define(Product, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      cover_image: '1603718874137.jpg',
      price:  randFunction(10000),
      quantity:  randFunction(50),
      is_active: false
    }
  })
  .build()


