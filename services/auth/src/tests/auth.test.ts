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
    const res = await request(app).post("/auth/register").send({
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
    const res = await request(app).post("/auth/register").send({
      email: "testuser@jest.com",
      password: "password123",
      name: "Jest User",
    });

    expect(res.status).toBe(409);
  });
});

describe("POST /auth/login ", () => {
  it("should login with correct credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "testuser@jest.com", password: "password123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("should reject wrong password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "testuser@jest.com", password: "password567" });
    expect(res.status).toBe(401);
  });

  it("should reject non-existent email", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "testuser123@jest.com", password: "password567" });
    expect(res.status).toBe(401);
  });
});

describe("GET /auth/me and POST /auth/refresh", () => {
  it("should access /me with valid access token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "testuser@jest.com", password: "password123" });

    const authToken = res.body.accessToken;

    const call = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${authToken}`);

    expect(call.status).toBe(200);
    expect(call.body).toHaveProperty("userId");
    expect(call.body).toHaveProperty("role");
  });

  it("should reject /me without token", async () => {
    const call = await request(app).get("/auth/me");

    expect(call.status).toBe(401);
  });

  it("should issue new access token via refresh cookie", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "testuser@jest.com", password: "password123" });

    const cookieHeader = res.header["set-cookie"];

    const call = await request(app)
      .post("/auth/refresh")
      .set("Cookie", cookieHeader);

    expect(call.status).toBe(200);
    expect(call.body).toHaveProperty("accessToken");
  });

  it("should reject refresh without cookie", async () => {
    const res = await request(app).post("/auth/refresh");
    expect(res.status).toBe(401);
  });
});
