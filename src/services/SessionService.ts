import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../database";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn } from "../interfaces";

export class SessionService {
  public create = async ({
    email,
    password,
  }: SessionCreate): Promise<SessionReturn> => {
    const foundUser = await prisma.user.findFirst({ where: { email } });
    if (!foundUser) {
      throw new AppError("Wrong email/password.", 401);
    }

    const hasSamePassword = await compare(password, foundUser.password);
    if (!hasSamePassword) {
      throw new AppError("Wrong email/password.", 401);
    }

    const secretKey = process.env.SECRET_KEY!;
    const expiresIn = process.env.EXPIRES_IN!;

    await prisma.user.update({
      where: { email },
      data: { lastLogin: new Date() },
    });

    const token = sign({}, secretKey, {
      expiresIn,
      subject: foundUser.id.toString(),
    });

    return { token };
  };
}
