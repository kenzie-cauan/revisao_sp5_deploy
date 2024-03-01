import { z } from "zod";
import { userReturnSchema, userSchema } from "./user.schema";

const addressSchema = z.object({
  id: z.number().positive(),
  street: z.string().min(1).max(255),
  number: z.number().positive().nullish(),
  addressInfo: z.string().nullish(),
  city: z.string().min(1).max(255),
  state: z.string().min(1).max(255),
  zipCode: z.string().min(1).max(20),
  country: z.string().min(1).max(255),
  user: userSchema,
});

const addressCreateSchema = addressSchema.omit({ id: true, user: true });
const addressUpdateSchema = addressCreateSchema.partial();
const addressReturnSchema = addressSchema.extend({ user: userReturnSchema });

export {
  addressCreateSchema,
  addressReturnSchema,
  addressSchema,
  addressUpdateSchema,
};
