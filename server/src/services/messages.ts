import { prisma } from "..";

const getAllMessages = async () => {
  return await prisma.message.findMany();
};

export type CreateMessageType = {
  content: string;
  createdAt: Date;
  userId: number;
};

const createMessage = async (message: CreateMessageType) => {
  return await prisma.message.create({
    data: message,
  });
};

export default { getAllMessages, createMessage };
