import 'reflect-metadata'
import { DataSource } from 'typeorm'
import {migration1710905329358} from "./migration/1710905329358-migration";
import 'dotenv/config'
import {User} from "./entity/User";

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as "mysql"|"postgres",
  // url: "postgresql://BlankAlmasry:cw8byQ1dFfWZ@ep-sparkling-violet-a2tlusv7.eu-central-1.aws.neon.tech/TollCollection?sslmode=require",
  // url: "mysql://root:root@localhost:3306/TollCollection",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [migration1710905329358],
  subscribers: [],
})
