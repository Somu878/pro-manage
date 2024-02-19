const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  tasks: [
    {
      content: {
        type: String,
        required: true,
      },
      isDone: {
        type: Boolean,
        default: false,
      },
    },
  ],
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
  },
  refUserId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", cardSchema, "cardsData");
