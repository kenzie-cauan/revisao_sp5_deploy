import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors";
import { prisma } from "../database";

class AuthMiddleware {
  public validateToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Missing authorization.", 401);
    }

    const [_bearer, token] = authorization.split(" ");

    if (!token) {
      throw new AppError("Missing bearer token.", 401);
    }

    const secretKey = process.env.SECRET_KEY!;

    const decoded = verify(token, secretKey);

    const foundUser = await prisma.user.findFirst({
      where: { id: Number(decoded.sub) },
    });

    if (!foundUser) {
      throw new AppError("User was disabled.", 403);
    }

    res.locals = { ...res.locals, decoded, decodedUser: foundUser };

    return next();
  };
}

export const auth = new AuthMiddleware();
