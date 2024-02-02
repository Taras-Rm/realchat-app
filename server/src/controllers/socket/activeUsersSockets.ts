import { ActiveUserSocketType } from "../../types/socket";

export class ActiveUsersSockets {
  activeUsersSockets: ActiveUserSocketType[] = [];

  constructor(usersSeckets: ActiveUserSocketType[]) {
    this.activeUsersSockets = usersSeckets;
  }

  add(userSecket: ActiveUserSocketType) {
    this.activeUsersSockets.push(userSecket);
  }

  deleteByUserId(userId: number) {
    this.activeUsersSockets = this.activeUsersSockets.filter(
      (u) => u.user.userId !== userId
    );
  }

  getAll() {
    return this.activeUsersSockets;
  }

  getActiveUsersIds = () => {
    return this.activeUsersSockets.map((aS) => aS.user.userId);
  };

  getSocketIdByUserId = (userId: number) => {
    return this.activeUsersSockets.find((aU) => aU.user.userId === userId)
      ?.socketId;
  };
}
