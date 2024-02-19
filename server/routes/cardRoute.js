const express = require("express");
const cardRouter = express.Router();
const authorization = require("../middlewares/authMiddleware");
const cardValidation = require("../validations/cardValidation");
const Card = require("../models/cardmodel");

cardRouter.post("/add", authorization, async (req, res) => {
  try {
    const cardData = await cardValidation.validateAsync(req.body);
    const newCard = new Card({
      ...cardData,
      refUserId: req.userId,
    });
    await newCard.save();
    return res.status(201).json({
      status: "success",
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

module.exports = cardRouter;
