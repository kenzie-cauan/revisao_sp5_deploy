import { hash } from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../database";
import { AppError } from "../errors";
import { UserCreate, UserReturn, UserUpdate } from "../interfaces";
import { userReturnSchema } from "../schemas";

export class UserService {
  public create = async (payload: UserCreate): Promise<UserReturn> => {
    payload.password = await hash(payload.password, 10);
    return userReturnSchema.parse(await prisma.user.create({ data: payload }));
  };

  public read = async (): Promise<Array<UserReturn>> => {
    return userReturnSchema.array().parse(await prisma.user.findMany());
  };

  public retrieve = async (decoded: JwtPayload): Promise<UserReturn> => {
    const id = Number(decoded.sub!);

    const foundUser = await prisma.user.findFirst({ where: { id } });

    if (!foundUser) {
      throw new AppError("User was disabled.", 403);
    }

    return userReturnSchema.parse(foundUser);
  };

  public partialUpdate = async (
    userId: string,
    payload: UserUpdate
  ): Promise<UserReturn> => {
    if (payload.password) {
      payload.password = await hash(payload.password, 10);
    }

    const user = await prisma.user.update({
      data: payload,
      where: { id: Number(userId) },
    });

    return userReturnSchema.parse(user);
  };

  public delete = async (userId: string): Promise<void> => {
    await prisma.user.delete({ where: { id: Number(userId) } });
  };
}
