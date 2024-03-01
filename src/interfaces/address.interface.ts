import { z } from "zod";
import {
  addressCreateSchema,
  addressReturnSchema,
  addressUpdateSchema,
} from "../schemas";

type AddressCreate = z.infer<typeof addressCreateSchema>;
type AddressUpdate = z.infer<typeof addressUpdateSchema>;
type AddressReturn = z.infer<typeof addressReturnSchema>;

export { AddressCreate, AddressReturn, AddressUpdate };
