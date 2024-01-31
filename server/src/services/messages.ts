import { prisma } from "..";

const getAllMessages = async () => {
  return await prisma.message.findMany({
    include: { user: true },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export type CreateMessageType = {
  content: string;
  createdAt: Date;
  userId: number;
};

const createMessage = async (message: CreateMessageType) => {
  return await prisma.message.create({
    data: message,
    include: {
      user: true,
    },
  });
};

export default { getAllMessages, createMessage };
