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
      return res.status(200).json({
        exists: "false",
        message: "Email not found",
      });
    }
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.status(200).send({ status: "invalid" });
    }
    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET);
    res.status(202).json({
      status: "success",
      token: token,
      username: userExists.name,
      id: userExists._id,
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
      return res.status(409).send({
        exists: true,
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
    res.status(201).json({
      status: "success",
      token: token,
      username: newuser.name,
      id: newuser._id,
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
        return res.status(401).json({ error: "Old password is incorrect" });
      }
      if (newPassword) {
        const newHashedPassword = await bcrypt.hashSync(newPassword, 10);
        user.password = newHashedPassword;
      }
    }
    if (name) {
      user.name = name;
    }
    await user.save();
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = authRouter;
