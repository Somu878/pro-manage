const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "UPDATE", "DELETE", "PATCH"],
  },
});
require("dotenv").config();
const db = require("./db/config");
const authRouter = require("./routes/authRoute");
const cardRouter = require("./routes/cardRoute");
const port = process.env.PORT || 9000;
app.use(express.json());
app.use("/api/v1/user", authRouter);
app.use("/api/v1/card", cardRouter);

io.on("connection", (socket) => {
  console.log(`A user connected : ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
