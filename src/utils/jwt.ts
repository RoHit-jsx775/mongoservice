import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export type TPayload = {
  id: string;
  username: string;
  email: string;
};

const jwtSecret = process.env.JWT_SECRET || "";
console.log("jwt=", jwtSecret);
if (!jwtSecret) {
  throw new Error("please set the secret for jwt.");
}

export function generateToken(payload: TPayload) {
  const token = sign(payload, jwtSecret, {
    expiresIn: 300,
  });
  return token;
}

export function verifyToken(token: string): TPayload {
  const validatedToken = verify(token, jwtSecret);
  return validatedToken as TPayload;
}
