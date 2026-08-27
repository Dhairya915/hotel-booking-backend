import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository";
import { HttpError } from "../lib/httpError";
import type { RegisterInput, LoginInput } from "../schemes/auth.schema";
import { signAccessToken, signRefreshToken } from "../lib/token";
import bcrypt from "bcrypt";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

export async function registerUser(input: RegisterInput) {
  const exist = await findUserByEmail(input.email);

  if (exist) {
    throw new HttpError(409, "Email already Registered");
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await createUser({
    email: input.email,
    password: hashedPassword,
    name: input.name,
    phone: input.phone,
  });

  return { id: user.id, name: user.name, email: user.email };
}

export async function loginUser(input: LoginInput) {
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new HttpError(401, "Invalid credentials");
  }

  const verifyUser = await bcrypt.compare(input.password, user.password);

  if (!verifyUser) {
    throw new HttpError(401, "Invalid credentials");
  }

  const accessToken = signAccessToken({ userId: user.id, role: user.role });
  const refreshToken = signRefreshToken({ userId: user.id });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email },
  };
}

export async function refreshAccessToken(refreshToken: string) {
  const verifyUser = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
    userId: string;
  };

  const user = await findUserById(verifyUser.userId);

  if (!user) {
    throw new HttpError(401, "Invalid refresh token");
  }

  const accessToken = signAccessToken({ userId: user.id, role: user.role });

  return { accessToken };
}
