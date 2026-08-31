import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../config/env";
import type { Room  } from "../generated/prisma/client";
import type { RoomType } from "../generated/prisma/enums";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function createRoom(data:{hotelId : string ; type: RoomType; pricePerNight: number}): Promise<Room>{  
    return await prisma.room.create({data}); 
}

export async function findRoomsByHotelId(hotelId: string): Promise<Room[]>{
    return await prisma.room.findMany({where : { hotelId }});
}