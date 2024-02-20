const { Server } = require("socket.io");
function initializeSocket(server, corsOrigin) {
  const io = new Server(server, {
    cors: {
      origin: corsOrigin,
      methods: ["GET", "POST", "UPDATE", "DELETE", "PATCH"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);
    socket.emit("yourCustomEvent", { message: "Hello from the server!" });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
}
module.exports = initializeSocket;
