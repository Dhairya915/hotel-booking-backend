import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../lib/httpError";
import { env } from "../config/env";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new HttpError(401, "unauthorized");
  }

  const parts = authHeader?.split(" ");

  if (parts[0] !== "Bearer") {
    throw new HttpError(401, "unauthorized");
  }

  const token = parts[1];

  const verifyToken = jwt.verify(token, env.JWT_ACCESS_SECRET) as {
    userId: string;
    role: string;
  };

  req.user = { userId: verifyToken.userId, role: verifyToken.role };

  next();
}
