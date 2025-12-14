"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyUser = exports.initSocket = exports.io = void 0;
const socket_io_1 = require("socket.io");
const onlineUsers = new Map();
const initSocket = (server) => {
    exports.io = new socket_io_1.Server(server, {
        cors: { origin: true, credentials: true },
    });
    exports.io.on("connection", (socket) => {
        console.log("🔌 Socket connected:", socket.id);
        socket.on("register", (userCode) => {
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
exports.initSocket = initSocket;
const notifyUser = (userCode, event, data) => {
    const socketId = onlineUsers.get(userCode);
    if (socketId) {
        exports.io.to(socketId).emit(event, data);
    }
};
exports.notifyUser = notifyUser;
