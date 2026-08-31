import { addRoom , getRoomsForHotel } from "../services/room.service";
import { createRoomSchema } from "../schemas/room.schema";
import { Request , Response , NextFunction } from "express";

export async function createRoomHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = createRoomSchema.parse(req.body);
    const room = await addRoom(parsed);
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
}

export async function getRoomsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const hotelId = req.params.hotelId as string;
    const getRooms = await getRoomsForHotel(hotelId);
    res.status(200).json(getRooms);
  } catch (err) {
    next(err);
  }
}