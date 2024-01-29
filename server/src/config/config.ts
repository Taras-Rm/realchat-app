import dotenv from "dotenv";

dotenv.config();

const SREVER_PORT = process.env.SERVER_PORT || "3003";
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || "24h";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
const PASSWORD_SALT_ROUNDS = process.env.PASSWORD_SALT_ROUNDS || "10";

interface IConfig {
  server: {
    port: number;
  };
  token: {
    expirationTime: string;
    secret: string;
  };
  password: {
    salt: number;
  };
}

const config: IConfig = {
  server: {
    port: parseInt(SREVER_PORT),
  },
  token: {
    expirationTime: TOKEN_EXPIRATION_TIME,
    secret: TOKEN_SECRET,
  },
  password: {
    salt: parseInt(PASSWORD_SALT_ROUNDS),
  },
};

export default config;
