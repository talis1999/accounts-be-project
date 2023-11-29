import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";

const port: number = Number(process.env.DB_PORT || 5432);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
