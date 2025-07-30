import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './src/config/database.sqlite',
    synchronize: true,
    logging: false,
    entities: ['./src/models/*.ts'],
    migrations: [],
    subscribers: [],
});