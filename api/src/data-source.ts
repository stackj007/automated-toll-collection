import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { Session } from './entity/Session';
import { TollGate } from './entity/TollGate';
import { Transaction } from './entity/Transaction';
import { User } from './entity/User';
import { UserVehicleRequest } from './entity/UserVehicleRequest';
import { Migration1713240724393 } from "./migration/1713240724393-migration";

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'mysql' | 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  migrationsRun: true,
  logging: process.env.DATABASE_LOGGING === 'true',
  insecureAuth: true,
  entities: [
    User,
    Session,
    UserVehicleRequest,
    Transaction,
    TollGate,
  ],
  migrations: [Migration1713240724393],
  subscribers: [],
});
