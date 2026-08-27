import { NextFunction, Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { registerSchema, loginSchema } from "../schemes/auth.schema";
import { env } from "../config/env";

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

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await loginUser(parsed);

    const token = result.refreshToken;

    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res
      .status(200)
      .json({ accessToken: result.accessToken, user: result.user });
  } catch (err) {
    next(err);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
}
