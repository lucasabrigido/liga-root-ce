import { z } from 'zod';

export const UserSchema = z.object({
    firstName: z.string().min(4),
    nickname: z.string().min(4),
    lastName: z.string().min(4),
    email: z.string().email(),
    birthdate: z.string(),
    password: z.string().min(4),
    password2: z.string().min(4),
});
