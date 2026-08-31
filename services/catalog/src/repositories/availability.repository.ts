import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env.js";
import type { RoomAvailability } from "../generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function bookRoomDate(roomId: string , date: Date): Promise<RoomAvailability>{
    const book = await prisma.roomAvailability.create({data: {roomId,date}});
    return book;
}

export async function isRoomAvailable(roomId: string, date: Date): Promise<boolean> {
  const available = await prisma.roomAvailability.findUnique({  where: { roomId_date: { roomId, date } } });
  return available === null;
}