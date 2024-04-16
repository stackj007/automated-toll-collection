import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'
import { Session } from './entity/Session'
import { TollGate } from './entity/TollGate'
import { Transaction } from './entity/Transaction'
import { User } from './entity/User'
import { UserVehicleRequest } from './entity/UserVehicleRequest'

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'mysql' | 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  migrationsRun: true,
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: [
    Session,
    TollGate,
    Transaction,
    User,
    UserVehicleRequest,
  ],
  migrations: ['src/migration/**/*.ts'],
  subscribers: [],
})
