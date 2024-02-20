const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const db = require("./db/config");
const authRouter = require("./routes/authRoute");
const cardRouter = require("./routes/cardRoute");
const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST", "UPDATE", "DELETE", "PATCH"],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/v1/user", authRouter);
app.use("/api/v1/card", cardRouter);

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  socket.emit("yourCustomEvent", { message: "Hello from the server!" });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = process.env.PORT || 9000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
