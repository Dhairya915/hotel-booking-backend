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

describe("Room and Availability", () => {
  let hotelId: string;
  let roomId: string;

  beforeAll(async () => {
    const res = await request(app).post("/hotels").send({
      name: "Room Test Hotel",
      city: "RoomTestCity",
      address: "456 Room St",
    });
    hotelId = res.body.id;
  });

  it("should create a room for the hotel", async () => {
  
    const addRoom = await request(app).post(`/rooms`).send({hotelId: hotelId, type: "DELUXE" , pricePerNight: 1000});
    
    expect(addRoom.status).toBe(201);
    expect(addRoom.body).toHaveProperty("id");

    roomId = addRoom.body.id;
  });

  it("should reject room creation for non-existent hotel", async () => {
    const addRoom = await request(app).post(`/rooms`).send({hotelId: '7f3a9c2e-81b4-4d67-a925-3e6f1b8c2047' , type: "DELUXE" , pricePerNight: 1000});

    expect(addRoom.status).toBe(404);
  });

  it("should book a room date successfully", async () => {
    
    const reserveRoom = await request(app).post(`/availability/book`).send({roomId: roomId , date:"2026-08-31T12:50:00.000Z"});

    expect(reserveRoom.status).toBe(201);
  });

  it("should reject double-booking same room+date", async () => {

    await request(app).post(`/availability/book`).send({roomId: roomId , date:"2026-08-31T12:50:00.000Z"});
    const reserveRoom = await request(app).post(`/availability/book`).send({roomId: roomId , date:"2026-08-31T12:50:00.000Z"});

    expect(reserveRoom.status).toBe(409);
  });
});