import { createUser, findUserByEmail } from "../repositories/user.repository";
import { HttpError } from "../lib/httpError";
import type { RegisterInput } from "../schemes/auth.schema";
import bcrypt from "bcrypt";

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
