import { User } from "@prisma/client";

export type ActiveUserType = {
  userId: number;
  isAdmin: boolean;
};

export type UserDetailsType = User & {
  isOnline: boolean;
};
