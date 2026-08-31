import z from "zod";

export const createRoomSchema = z.object({
    hotelId: z.string().min(1),
    type: z.enum(["SINGLE", "DOUBLE", "DELUXE", "SUITE"]),
    pricePerNight: z.number().positive(),
});

export type createRoomInput =  z.infer<typeof createRoomSchema>;