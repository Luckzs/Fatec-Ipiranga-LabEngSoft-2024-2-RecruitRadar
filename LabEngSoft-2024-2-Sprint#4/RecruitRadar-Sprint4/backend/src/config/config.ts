import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
//dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  SECRET: string | undefined;
  TYPEORM_CONNECTION: string | undefined;
  TYPEORM_HOST: string | undefined;
  TYPEORM_PORT : number | undefined;
  TYPEORM_USERNAME : string | undefined;
  TYPEORM_PASSWORD : string | undefined;
  TYPEORM_DATABASE : string | undefined;
  //TYPEORM_MIGRATIONS : string | undefined;
  //TYPEORM_MIGRATIONS_DIR : string | undefined;
  //TYPEORM_ENTITIES : string | undefined;
  //TYPEORM_ENTITIES_DIR : string | undefined;
}

interface Config {
  SECRET: string;
  TYPEORM_CONNECTION: string ;
  TYPEORM_HOST: string ;
  TYPEORM_PORT : number ;
  TYPEORM_USERNAME : string ;
  TYPEORM_PASSWORD : string ;
  TYPEORM_DATABASE : string ;
  //TYPEORM_MIGRATIONS : string ;
  //TYPEORM_MIGRATIONS_DIR : string ;
  //TYPEORM_ENTITIES : string ;
  //TYPEORM_ENTITIES_DIR : string ;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    SECRET: process.env.SECRET,
    TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
    TYPEORM_HOST: process.env.TYPEORM_HOST,
    TYPEORM_PORT: process.env.TYPEORM_PORT? Number(process.env.TYPEORM_PORT):undefined,
    TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
    TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
    TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
    //TYPEORM_MIGRATIONS: process.env.TYPEORM_MIGRATIONS,
    //TYPEORM_MIGRATIONS_DIR: process.env.TYPEORM_MIGRATIONS_DIR,
    //TYPEORM_ENTITIES: process.env.TYPEORM_ENTITIES,
    //TYPEORM_ENTITIES_DIR: process.env.TYPEORM_ENTITIES_DIR,
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;


