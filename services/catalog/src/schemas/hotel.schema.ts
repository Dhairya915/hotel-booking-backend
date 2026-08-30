import z from "zod";

export const createHotelSchema = z.object({
    name: z.string().min(1),
    city: z.string().min(1),
    address: z.string().min(1),
})

export type CreateHotelInput = z.infer<typeof createHotelSchema>;