import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signAccessToken(payload: {
  userId: string;
  role: string;
}): string {
  const token = jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
  return token;
}

export function signRefreshToken(payload: { userId: string }): string {
  const token = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return token;
}
