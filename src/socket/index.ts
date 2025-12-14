import { Server } from "socket.io";

export let io: Server;
const onlineUsers = new Map<string, string>();

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: { origin: true, credentials: true },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);


    socket.on("register", (userCode: string) => {
      onlineUsers.set(userCode, socket.id);
    });

    socket.on("disconnect", () => {
      for (const [key, value] of onlineUsers.entries()) {
        if (value === socket.id) {
          onlineUsers.delete(key);
        }
      }
    });
  });
};


export const notifyUser = (
  userCode: string,
  event: string,
  data: any
) => {
  const socketId = onlineUsers.get(userCode);
  if (socketId) {
    io.to(socketId).emit(event, data);
  }
};
