import { DataSource } from "typeorm";
import { ConnectOptions } from "typeorm";
import config from "../config/config";

export const connectionSource = new DataSource({
    type: 'postgres',
    host: config.TYPEORM_HOST || 'localhost',
    port: config.TYPEORM_PORT,
    username: config.TYPEORM_USERNAME,
    password: config.TYPEORM_PASSWORD,
    database: config.TYPEORM_DATABASE,
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['src/entities/**/*{.ts,.js}'],
    migrations: ['src/database/migrations/**/*{.ts,.js}']
});

connectionSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })