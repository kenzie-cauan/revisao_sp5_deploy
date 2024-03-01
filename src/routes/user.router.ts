import { Router } from "express";
import { UserController } from "../controllers/";
import { auth, ensure } from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";

export const userRouter = Router();
const controller = new UserController();

userRouter.post(
  "/register",
  ensure.validBody(userCreateSchema),
  ensure.uniqueEmail,
  controller.create
);

userRouter.use(auth.validateToken);

userRouter.get("", controller.read);
userRouter.get("/profile", controller.retrieve);

userRouter.use(
  "/:userId",
  ensure.paramsIdExists({
    error: "User not found.",
    model: "user",
    searchKey: "userId",
  })
);

userRouter.patch(
  "/:userId",
  ensure.validBody(userUpdateSchema),
  ensure.uniqueEmail,
  controller.partialUpdate
);
userRouter.delete("/:userId", controller.delete);
