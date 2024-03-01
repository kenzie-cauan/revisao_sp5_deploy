import { Address } from "@prisma/client";
import { prisma } from "../database";
import { AddressCreate, AddressReturn, AddressUpdate } from "../interfaces";
import { addressReturnSchema } from "../schemas";

export class AddressService {
  public create = async (
    userId: string,
    payload: AddressCreate
  ): Promise<AddressReturn> => {
    const data = { ...payload, userId: Number(userId) };
    return addressReturnSchema.parse(
      await prisma.address.create({ data, include: { user: true } })
    );
  };

  public read = async (userId: string): Promise<Array<AddressReturn>> => {
    const userAddressess = await prisma.address.findMany({
      where: { userId: Number(userId) },
      include: { user: true },
    });

    return addressReturnSchema.array().parse(userAddressess);
  };

  public partialUpdate = async (
    payload: AddressUpdate,
    address: Address
  ): Promise<AddressReturn> => {
    const updatedAddress = await prisma.address.update({
      where: { id: address.id },
      data: payload,
      include: { user: true },
    });

    return addressReturnSchema.parse(updatedAddress);
  };

  public delete = async (address: Address): Promise<void> => {
    await prisma.address.delete({ where: { id: address.id } });
  };
}
