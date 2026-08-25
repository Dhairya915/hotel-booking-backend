import {z} from 'zod';

const envSchema = z.object({
    PORT: z.string().default("4000"),
    NODE_ENV:z.enum(["development","test","production"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
    console.error("❌ Invalid environment variables:" , parsed.error.format());
    process.exit(1);
}

export const env = parsed.data;