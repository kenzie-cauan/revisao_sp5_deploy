import { Address, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

class PermissionMiddleware {
  public isAddressOwner = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // const { foundResource: address, decodedUser: user } = res.locals;

    const address: Address = res.locals.foundResource;
    const user: User = res.locals.decodedUser;

    if (address.userId !== user.id) {
      throw new AppError("Insufficient permission.", 403);
    }

    return next();
  };
}

export const permission = new PermissionMiddleware();
