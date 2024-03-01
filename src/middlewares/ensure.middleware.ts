import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database";
import { AppError } from "../errors";
import { DynamicParamsIdFinder, PrismaClientGeneric } from "../interfaces";

class EnsureMiddleware {
  public validBody =
    (schema: AnyZodObject) =>
    (req: Request, _res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);
      return next();
    };

  public paramsIdExists =
    ({ error, model, searchKey }: DynamicParamsIdFinder) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const id = Number(req.params[searchKey]);
      const client = prisma[model] as PrismaClientGeneric;

      const foundResource = await client.findFirst({ where: { id } });

      if (!foundResource) {
        throw new AppError(error, 404);
      }

      res.locals = { ...res.locals, foundResource };

      return next();
    };

  public uniqueEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.body;
    if (!email) return next();

    const foundUser = await prisma.user.findFirst({ where: { email } });

    if (foundUser) {
      throw new AppError("E-mail already exists.", 409);
    }

    return next();
  };
}

export const ensure = new EnsureMiddleware();
