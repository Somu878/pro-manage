const express = require("express");
const cardRouter = express.Router();
const authorization = require("../middlewares/authMiddleware");
const cardValidation = require("../validations/cardValidation");
const Card = require("../models/cardmodel");
const {
  startOfWeek,
  endOfWeek,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
} = require("date-fns");
// cardRouter.get("/by-status/:status", authorization, async (req, res) => {
//   try {
//     const { status } = req.params;
//     const statusValues = ["backlog", "todo", "progress", "done"];
//     if (!statusValues.includes(status)) {
//       return res
//         .status(400)
//         .json({ status: "invalid", message: "Invalid Status value" });
//     }
//     const cardDataByStatus = await Card.find({ status, refUserId: req.userId });
//     res.status(201).send({ data: cardDataByStatus });
//   } catch (error) {
//     res.status(400).send("Internal server error");
//   }
// });
cardRouter.get(
  "/all/:datePreference/:status",
  authorization,
  async (req, res) => {
    try {
      let { datePreference, status } = req.params;
      const currentDate = new Date();
      let startDate, endDate;

      if (!datePreference || datePreference.trim() === "") {
        startDate = new Date(0);
        endDate = new Date();
      } else {
        switch (datePreference) {
          case "today":
            startDate = startOfDay(currentDate);
            endDate = endOfDay(currentDate);
            break;
          case "week":
            startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
            endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
            break;
          case "month":
            startDate = startOfMonth(currentDate);
            endDate = endOfMonth(currentDate);
            break;
          default:
            return res.status(400).json({ error: "Invalid date" });
        }
      }

      const query = {
        createdAt: { $gte: startDate, $lt: endDate },
        refUserId: req.userId,
        ...(status && { status: status.toLowerCase() }),
      };

      const cardsByDateAndStatus = await Card.find(query);
      res.status(200).json({ data: cardsByDateAndStatus });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

cardRouter.get(
  "/all/:datePreference/:status",
  authorization,
  async (req, res) => {
    try {
      const { datePreference } = req.params;
      const currentDate = new Date();
      let startDate, endDate;
      switch (datePreference) {
        case "today":
          startDate = startOfDay(currentDate);
          endDate = endOfDay(currentDate);
          break;
        case "week":
          startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
          endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
          break;
        case "month":
          startDate = startOfMonth(currentDate);
          endDate = endOfMonth(currentDate);
          break;
        default:
          return res.status(400).json({ error: "Invalid date preference" });
      }
      const cardsByDatePreference = await Card.find({
        createdAt: { $gte: startDate, $lt: endDate },
        refUserId: req.userId,
      });

      res.status(200).json({ data: cardsByDatePreference });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
cardRouter.get("/analytics", authorization, async (req, res) => {
  try {
    const getAll = await Card.find({
      refUserId: req.userId,
    });

    const cardsWithDueDate = await Card.countDocuments({
      refUserId: req.userId,
      dueDate: { $exists: true, $ne: null },
    });
    const statusAnalytics = getAll.reduce((result, card) => {
      //TODO
      const status = card.status || "Unknown";
      result[status] = (result[status] || 0) + 1;
      return result;
    }, {});
    const priorityAnalytics = getAll.reduce((result, card) => {
      const priority = card.priority || "Unknown";
      result[priority] = (result[priority] || 0) + 1;
      return result;
    }, {});

    res.json({
      priorityAnalytics,
      cardsWithDueDate,
      statusAnalytics,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

cardRouter.get("/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;
    const cardData = await Card.findById(cardId);
    if (!cardData) {
      return res.status(404).json({
        message: "No card exists with that Id",
      });
    }
    res.status(200).json({ data: cardData });
  } catch (error) {
    console.log(error);
    res.status(401).send("Internal Server Error");
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
