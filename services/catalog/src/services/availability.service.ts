import { bookRoomDate , isRoomAvailable } from "../repositories/availability.repository";
import { HttpError } from "../lib/httpError";

export async function reserveRoomDate(roomId: string, date: Date) {
  try {
    const booked = await bookRoomDate(roomId,date);
    return booked;
  } catch (err: any) {
        if(err.code == 'P2002'){
            throw new HttpError(409,"Room already booked for this date");
        }
    throw err;
  }
}

export async function checkAvailability(roomId: string, date: Date) {
  return isRoomAvailable(roomId, date);
}