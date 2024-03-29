const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidation");
const { validateAsync } = require("@hapi/joi/lib/base");
const authorization = require("../middlewares/authMiddleware");
authRouter.use(express.json());
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = await loginValidation.validateAsync(req.body);
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(203).json({
        message: "Email not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.status(202).send({ status: "invalid" });
    }
    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    if (error.details) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.details });
    } else {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const userData = await registerValidation.validateAsync(req.body);
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      return res.status(202).send({
        message:
          "Email already registered, Please login or try different credentials",
      });
    }
    const hashedPassword = await bcrypt.hashSync(userData.password, 10);
    const newuser = new User({
      ...userData,
      password: hashedPassword,
    });
    const savedUser = await newuser.save();
    const token = await jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      token: token,
    });
  } catch (error) {
    if (error.details) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error.details });
    } else {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  }
});
authRouter.patch("/update", authorization, async (req, res) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (oldPassword) {
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ status: "failed", error: "Old password is incorrect" });
      }
      if (newPassword) {
        const newHashedPassword = await bcrypt.hashSync(newPassword, 10);
        user.password = newHashedPassword;
      }
    }
    if (name) {
      user.name = name;
    }
    const data = await user.save();
    res.status(200).json({ status: "success", updatedData: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// authRouter.get('/verifyToken',authorization,)
authRouter.get("/data", authorization, (req, res) => {
  const username = req.userName;
  if (username) {
    res.status(200).json({ message: "ok", name: username });
  } else {
    res.status(401).json({ message: "failed" });
  }
});
module.exports = authRouter;
