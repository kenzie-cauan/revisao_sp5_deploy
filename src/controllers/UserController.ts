import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {
  private userService = new UserService();

  public create = async (
    { body }: Request,
    res: Response
  ): Promise<Response> => {
    const user = await this.userService.create(body);
    return res.status(201).json(user);
  };

  public read = async (_req: Request, res: Response): Promise<Response> => {
    const users = await this.userService.read();
    return res.status(200).json(users);
  };

  public retrieve = async (_req: Request, res: Response): Promise<Response> => {
    const { decoded } = res.locals;
    const user = await this.userService.retrieve(decoded);
    return res.status(200).json(user);
  };

  public partialUpdate = async (
    { body, params: { userId } }: Request,
    res: Response
  ): Promise<Response> => {
    const user = await this.userService.partialUpdate(userId, body);
    return res.status(200).json(user);
  };

  public delete = async (
    { params: { userId } }: Request,
    res: Response
  ): Promise<Response> => {
    await this.userService.delete(userId);
    return res.status(204).json();
  };
}
