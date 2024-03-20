import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import {migration1710905329358} from "./migration/1710905329358-migration";

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
  migrations: [migration1710905329358],
  subscribers: [],
})
