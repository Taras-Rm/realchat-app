import dotenv from "dotenv";

dotenv.config();

const SREVER_PORT = process.env.SERVER_PORT || "3003";

interface IConfig {
  server: {
    port: number;
  };
}

const config: IConfig = {
  server: {
    port: parseInt(SREVER_PORT),
  },
};

export default config;
