import { CurrentUser } from "@/types";
import jwt from "jsonwebtoken";

export function signJwtToken(payload: object, options = {}) {
  const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
  const token = jwt.sign(payload, secret, options);
  return token;
}

export function verifyJwtToken(token: string) {
  try {
    const secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}
