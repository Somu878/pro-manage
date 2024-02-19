const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db/config");
const authRouter = require("./routes/authRoute");
const cardRouter = require("./routes/cardRoute");
const port = process.env.PORT || 9000;
app.use(express.json());
app.use("/api/v1/user", authRouter);
app.use("/api/v1/card", cardRouter);
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
