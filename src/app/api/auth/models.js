import { z } from 'zod';

export const SchemaUserLogin = z.object({
    email: z.string(),
    password: z.string().min(4),
});
