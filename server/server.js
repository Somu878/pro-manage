const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db/config");
const authRouter = require("./routes/authRoute");
const authmiddlware = require("./middlewares/authMiddleware");
const port = process.env.PORT || 9000;
app.use("/api/v1/user", authRouter);
app.get("/apo/v1/getData", authmiddlware, (req, res) => {
  res.send({ userId: req.userId });
});
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
