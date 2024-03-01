import { z } from "zod";
import {
  userCreateSchema,
  userReturnSchema,
  userUpdateSchema,
} from "../schemas";

type UserCreate = z.infer<typeof userCreateSchema>;
type UserUpdate = z.infer<typeof userUpdateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;

export { UserCreate, UserReturn, UserUpdate };
