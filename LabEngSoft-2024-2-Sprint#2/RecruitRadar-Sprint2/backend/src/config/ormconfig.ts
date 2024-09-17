import { DataSource } from "typeorm";
import { ConnectOptions } from "typeorm";

export const connectionSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'test',
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