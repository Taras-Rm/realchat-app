import jwt from "jsonwebtoken";
import { TokenType } from "../interfaces/token";

export function generateAccessToken(id: number, secret: string, etl: string) {
  return jwt.sign({ id }, secret, { expiresIn: etl });
}

export function parseAccessToken(token: string, secret: string): number {
  const decodedData = jwt.verify(token, secret) as TokenType;
  return decodedData.id;
}
