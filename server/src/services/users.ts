import { User } from "@prisma/client";
import { prisma } from "..";

const findUserByName = async (name: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  return user;
};

const getUsersCount = async (): Promise<number> => {
  return await prisma.user.count();
};

export type CreateUserType = {
  name: string;
  nameColor: string;
  isAdmin: boolean;
  isMute: boolean;
  isBan: boolean;
  password: string;
};

const createUser = async (user: CreateUserType) => {
  return await prisma.user.create({
    data: user,
  });
};

const findUserById = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const getAllUsers = async (): Promise<User[] | null> => {
  const users = await prisma.user.findMany();

  return users;
};

export default {
  findUserByName,
  getUsersCount,
  createUser,
  findUserById,
  getAllUsers,
};
