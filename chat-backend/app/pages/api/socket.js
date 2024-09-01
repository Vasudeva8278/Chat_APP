import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.IO server...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });
  } else {
    console.log("Socket.IO server already running.");
  }

  res.end();
}
