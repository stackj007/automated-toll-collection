import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import { Migration1709658629562 } from './migration/1709658629562-migration'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'TollCollection',
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [Migration1709658629562],
  subscribers: [],
})
