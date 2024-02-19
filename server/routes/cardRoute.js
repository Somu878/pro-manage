const express = require("express");
const cardRouter = express.Router();
const authorization = require("../middlewares/authMiddleware");
const cardValidation = require("../validations/cardValidation");
const Card = require("../models/cardmodel");
cardRouter.get("/", authorization, async (req, res) => {
  try {
    const data = await Card.find();
    res.status(201).send(data);
  } catch (error) {
    res.status(400).send("Internal server error");
  }
});
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
      message: "new card created",
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
cardRouter.patch("/update/:cardId", authorization, async (req, res) => {
  try {
    const { cardId } = req.params;
    const cardData = await cardValidation.validateAsync(req.body);
    if (!cardId) {
      return res
        .status(400)
        .json({ status: "failed", error: "Card ID is required for updating" });
    }
    const existingCard = await Card.findOne({
      _id: cardId,
      refUserId: req.userId,
    });
    if (!existingCard) {
      return res.status(404).json({ error: "Card not found" });
    }
    if (cardData.title) existingCard.title = cardData.title;
    if (cardData.priority) existingCard.priority = cardData.priority;
    if (cardData.tasks) existingCard.tasks = cardData.tasks;
    if (cardData.dueDate) existingCard.dueDate = cardData.dueDate;
    if (cardData.status) existingCard.status = cardData.status;
    await existingCard.save();
    return res.status(200).json({
      status: "success",
      message: "Card updated successfully",
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
cardRouter.delete("/delete/:cardId", authorization, async (req, res) => {
  try {
    const { cardId } = req.params;
    const existingCard = await Card.findById(cardId);
    if (!existingCard) {
      return res.status(404).json({ error: "Card not found" });
    }
    if (existingCard.refUserId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this card" });
    }
    await existingCard.deleteOne();
    res
      .status(200)
      .json({ status: "success", message: "Card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = cardRouter;
