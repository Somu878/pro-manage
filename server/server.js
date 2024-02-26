const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db = require("./db/config");
const authRouter = require("./routes/authRoute");
const cardRouter = require("./routes/cardRoute");
const app = express();
const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(express.json());
app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET, POST,PATCH,DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/board", cardRouter);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
