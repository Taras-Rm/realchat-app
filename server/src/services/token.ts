import jwt from "jsonwebtoken";
import { TokenType } from "../types/token";

function generateAccessToken(id: number, secret: string, etl: string) {
  return jwt.sign({ id }, secret, { expiresIn: etl });
}

function parseAccessToken(token: string, secret: string): number {
  const decodedData = jwt.verify(token, secret) as TokenType;
  return decodedData.id;
}

export default { generateAccessToken, parseAccessToken };
