import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(5).max(255),
  email: z.string().email().max(255),
  password: z.string().min(4),
  admin: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
  lastLogin: z.date().nullish(),
});

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  lastLogin: true,
});
const userUpdateSchema = userCreateSchema.omit({ admin: true }).partial();
const userReturnSchema = userSchema.omit({ password: true });

export { userCreateSchema, userReturnSchema, userSchema, userUpdateSchema };
