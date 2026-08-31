import z, { date } from "zod";

export const bookDateSchema = z.object({
    roomId: z.string().uuid(),
    date: z.coerce.date()
})

export type BookDateInput = z.infer<typeof bookDateSchema>;