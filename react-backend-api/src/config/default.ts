import dotenv from 'dotenv';
dotenv.config();

interface AppConfig {
  port: number | string;
  environment: string;
  database: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiration: string;
  };
}

const config: AppConfig = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development',
  database: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/cmis_event_connect'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change_me_in_env',
    expiration: process.env.JWT_EXPIRATION || '1h'
  }
};

export default config;