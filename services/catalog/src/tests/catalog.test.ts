import request from "supertest";
import app from "../app.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

afterAll(async () => {

    await prisma.roomAvailability.deleteMany();
    await prisma.room.deleteMany();
    await prisma.hotel.deleteMany();

 
  await prisma.$disconnect();
});

describe("Catalog service", () => {
  it("should create a hotel", async () => {
    const response = await request(app).post('/hotels').send({name:'Test Hotel' , city:'TestCity' , address:'123 Test St'});
    expect(response.status).toBe(201);
  });

  it("should reject duplicate hotel (same name+city)", async () => {
    await request(app).post('/hotels').send({name:'Test Hotel' , city:'TestCity' , address:'123 Test St'});

    const response = await request(app).post('/hotels').send({name:'Test Hotel' , city:'TestCity' , address:'123 Test St'});
    expect(response.status).toBe(409);
  });

  it("should search hotels by city", async () => {
    await request(app).post('/hotels').send({name:'Test Hotel' , city:'TestCity' , address:'123 Test St'});
    const hotel = await request(app).get('/hotels?city=TestCity');
    expect(hotel.body).toBeInstanceOf(Array);
    expect(hotel.status).toBe(200);
  });
});