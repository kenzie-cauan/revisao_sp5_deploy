import { Request, Response } from "express";
import { AddressService } from "../services";

export class AddressController {
  private addressService = new AddressService();

  public create = async (
    { body }: Request,
    res: Response
  ): Promise<Response> => {
    const { sub } = res.locals.decoded;
    return res.status(201).json(await this.addressService.create(sub, body));
  };

  public read = async (_req: Request, res: Response): Promise<Response> => {
    const { sub } = res.locals.decoded;
    return res.status(200).json(await this.addressService.read(sub));
  };

  public partialUpdate = async (
    { body }: Request,
    res: Response
  ): Promise<Response> => {
    const { foundResource } = res.locals;

    return res
      .status(200)
      .json(await this.addressService.partialUpdate(body, foundResource));
  };

  public delete = async (_req: Request, res: Response): Promise<Response> => {
    const { foundResource } = res.locals;
    return res
      .status(204)
      .json(await this.addressService.delete(foundResource));
  };
}
