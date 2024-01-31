import dotenv from "dotenv";

dotenv.config();

const SREVER_PORT = process.env.SERVER_PORT || "3003";
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME || "24h";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
const PASSWORD_SALT_ROUNDS = process.env.PASSWORD_SALT_ROUNDS || "10";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "";

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
  clientOrigin: string;
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
  clientOrigin: CLIENT_ORIGIN,
};

export default config;
