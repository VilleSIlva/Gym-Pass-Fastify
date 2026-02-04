import z from "zod";
import "dotenv"

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Invalid environment variables", _env.error.format());
    throw new Error("Invalid environment variables");
}

export const env = _env.data;