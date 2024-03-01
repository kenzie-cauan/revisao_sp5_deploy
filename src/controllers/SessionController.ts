import { Request, Response } from "express";
import { SessionService } from "../services";

export class SessionController {
  private sessionService = new SessionService();

  public create = async (req: Request, res: Response): Promise<Response> => {
    return res.status(201).json(await this.sessionService.create(req.body));
  };
}
