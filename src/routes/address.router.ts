import { Router } from "express";
import { AddressController } from "../controllers";
import { auth, ensure, permission } from "../middlewares";
import { addressCreateSchema, addressUpdateSchema } from "../schemas";

export const addressRouter = Router();

addressRouter.use(auth.validateToken);

const controller = new AddressController();

addressRouter.post(
  "",
  ensure.validBody(addressCreateSchema),
  controller.create
);
addressRouter.get("", controller.read);

addressRouter.use(
  "/:addressId",
  ensure.paramsIdExists({
    error: "Address not found.",
    model: "address",
    searchKey: "addressId",
  }),
  permission.isAddressOwner
);

addressRouter.patch(
  "/:addressId",
  ensure.validBody(addressUpdateSchema),
  controller.partialUpdate
);
addressRouter.delete("/:addressId", controller.delete);
