import { Sequelize } from 'sequelize';
import 'dotenv/config';

//Singleton class to manage the connection to the database
export class SequelizeDB {
  private static instance: SequelizeDB;
  private connection: Sequelize;

  private constructor() {
    if (
      !process.env.DB_NAME ||
      !process.env.DB_USER ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT
    ) {
      throw new Error("Missing environment variable");
    }

    this.connection = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        /* dialectOptions: {
          useUTC: false, // for reading from database
        }, */
        timezone: "+02:00",
      }
    );
  }

  public static getConnection(): Sequelize {
    if (!SequelizeDB.instance) {
      SequelizeDB.instance = new SequelizeDB();
    }
    return SequelizeDB.instance.connection;
  }
}