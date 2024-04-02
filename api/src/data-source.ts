import 'reflect-metadata'
import { DataSource } from 'typeorm'
import 'dotenv/config'

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as "mysql"|"postgres",
  // url: "postgresql://BlankAlmasry:cw8byQ1dFfWZ@ep-sparkling-violet-a2tlusv7.eu-central-1.aws.neon.tech/TollCollection?sslmode=require",
  // url: "mysql://root:root@localhost:3306/TollCollection",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: process.env.DATABASE_LOGGING === "true",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
})
