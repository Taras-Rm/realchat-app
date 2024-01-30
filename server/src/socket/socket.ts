import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import messages from "../services/messages";
import { CustomSocket } from "../interfaces/socket";

const socket = (
  socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    CustomSocket
  >
): void => {
  console.log("User is connected");
  
  socket.on("sendMessage", async (msg) => {
    const now = new Date();
    await messages.createMessage({
      createdAt: now,
      userId: socket.data.userId,
      content: msg,
    });
    console.log(msg);
  });

  socket.on("disconnect", () => {
    console.log("User is disconnected");
  });
};

export default socket;
