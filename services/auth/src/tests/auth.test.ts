import request from "supertest";
import app from "../app.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email: "testuser@jest.com" } });
  await prisma.$disconnect();
});

describe("POST /auth/register", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "testuser@jest.com",
        password: "password123",
        name: "Jest User",
      });

    expect(res.status).toBe(201);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Jest User");
    expect(res.body).toHaveProperty("email", "testuser@jest.com");
    expect(res.body.password).toBeUndefined();
  });

  it("should reject duplicate email", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "testuser@jest.com",
        password: "password123",
        name: "Jest User",
      });

    expect(res.status).toBe(409);
  });
});
