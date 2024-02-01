import { prisma } from "..";

const getMessages = async () => {
  const messages = await prisma.message.findMany({
    include: { user: true },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
  // sort by date
  messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  return messages
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

export default { getMessages, createMessage };
