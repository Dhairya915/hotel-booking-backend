import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";
import type { Hotel } from "../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function createHotel(data: {
  name: string;
  city: string;
  address: string;
}): Promise<Hotel> {
    return await prisma.hotel.create({data});
}

export async function findHotelsByCity(city: string): Promise<Hotel[]> {
    return await prisma.hotel.findMany({ where: { city } });
}

export async function findHotelByNameAndCity(name: string, city: string): Promise<Hotel | null> {
  return await prisma.hotel.findFirst({ where: {name , city}})
}

export async function findHotelById(id: string): Promise<Hotel | null>{
  return await prisma.hotel.findUnique({ where : { id }});
}