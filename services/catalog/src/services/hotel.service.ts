import { HttpError } from "../lib/httpError";
import { createHotel , findHotelByNameAndCity, findHotelsByCity } from "../repositories/hotel.repository";

export async function addHotel(data: {name: string , city: string , address: string}){
    const hotel = await findHotelByNameAndCity(data.name , data.city);

    if(hotel){
        throw new HttpError(409 , 'Hotel already exists in this city');
    }

    return await createHotel(data);
}

export async function searchHotelsByCity(city: string){
    return await findHotelsByCity(city)
}