import { NextFunction, Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import { registerSchema } from "../schemes/auth.schema";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = registerSchema.parse(req.body);
    const user = await registerUser({
      email: parsed.email,
      password: parsed.password,
      name: parsed.name,
      phone: parsed.phone,
    });
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}
