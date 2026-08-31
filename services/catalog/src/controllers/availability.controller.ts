import { bookDateSchema } from "../schemas/availability.schema";
import { reserveRoomDate } from "../services/availability.service";
import { Request, Response, NextFunction } from "express";

export async function bookDateHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = bookDateSchema.parse(req.body);
    const reserve = await reserveRoomDate(parsed.roomId, parsed.date);
    res.status(201).json(reserve);
  } catch (err) {
    next(err);
  }
}