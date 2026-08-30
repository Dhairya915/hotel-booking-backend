import { Request , Response , NextFunction } from "express";
import { createHotelSchema } from "../schemas/hotel.schema";
import { addHotel , searchHotelsByCity } from "../services/hotel.service";
import { add } from "winston";

export async function createHotelHandler(req: Request , res: Response , next:NextFunction){
    try{
        const parsed = createHotelSchema.parse(req.body);
        const hotel = await addHotel(parsed);
        return res.status(201).json(hotel);

    }catch (err) {
    next(err);
  }
}

export async function searchHotelsHandler(req: Request, res: Response, next: NextFunction) {
    try{
        const city = req.query.city as string;
        const hotel = await searchHotelsByCity(city);
        res.status(200).json(hotel);

    }catch(err){
        next(err);
    }
}