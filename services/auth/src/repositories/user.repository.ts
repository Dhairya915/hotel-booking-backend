import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env";
import type { User } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  phone?: string;
}): Promise<User> {
  return prisma.user.create({ data });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email: email } });
}
