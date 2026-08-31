import { createRoom , findRoomsByHotelId } from "../repositories/room.repository";
import { findHotelById } from "../repositories/hotel.repository";
import { HttpError } from "../lib/httpError";
import type { RoomType } from "../generated/prisma/enums";

export async function addRoom(data: { hotelId: string; type: RoomType; pricePerNight: number }){
    const hotelExist = await findHotelById(data.hotelId);

    if(!hotelExist){
        throw new HttpError(404,"Hotel not found");
    }

    const add = await createRoom(data);

    return add;
}

export async function getRoomsForHotel(hotelId: string){
    const rooms = await findRoomsByHotelId(hotelId);
    return rooms;
}