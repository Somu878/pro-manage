const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = express();
var cors = require("cors");
const origin = process.env.CLIENT_ORIGIN;
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});
const corsConfig = {
  origin: ["*"],
  credentials: true,
};
app.use(cors(corsConfig));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_ORIGIN, "http://localhost:5173"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PATCH"],
  },
});
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
