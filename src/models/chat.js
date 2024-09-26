const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const ChatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },

    questionAnswer: [
      {
        question: { type: String, trim: true },
        answer: { type: String, trim: true, required:true },
      },
    ],
  },
  {
    collection: "chats",
    timestamps: {
      createdAt:"sessionStartedAt",
      updatedAt:"sessionEndedAt"
    },
  }
);

module.exports = model("Chat", ChatSchema);
