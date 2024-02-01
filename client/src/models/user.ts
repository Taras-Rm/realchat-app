export type UserType = {
  id: number;
  name: string;
  nameColor: string;
  isAdmin: boolean;
  isMute: boolean;
  isBan: boolean;
};

export type UserDetailsType = UserType & {
  isOnline: boolean;
};
