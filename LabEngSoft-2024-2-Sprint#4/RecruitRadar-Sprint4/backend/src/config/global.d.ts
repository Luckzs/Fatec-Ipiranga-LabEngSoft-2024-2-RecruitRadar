namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      TYPEORM_CONNECTION: string;
      TYPEORM_HOST: string;
      TYPEORM_PORT: string;
      TYPEORM_USERNAME: string;
      TYPEORM_PASSWORD: string;
      TYPEORM_DATABASE: string;
      TYPEORM_MIGRATIONS: string;
      TYPEORM_MIGRATIONS_DIR: string;
      TYPEORM_ENTITIES: string;
      TYPEORM_ENTITIES_DIR: string;
    }
  }