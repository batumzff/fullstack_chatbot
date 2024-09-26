"use strict";

const Chat = require("../models/chat");

module.exports = {
  list: async (req, res) => {
    const data = await Chat.find();

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    const data = await Chat.create(req.body);

    res.status(201).send({
      error: false,

      data,
    });
  },

  read: async (req, res) => {
    // const {chatId} = req.body
    const data = await Chat.findOne({ _id: req.params.chatId });

    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const { questionAnswer, chatId } = req.body;

    const chat = await Chat.findOne({ _id: chatId });

    const existingQuestion = chat.questionAnswer.find(
      (qa) => qa.question.toString() === questionAnswer[0].question.toString()
    );

    // If the question is found, skip the update
    if (existingQuestion) {
      return res.status(200).send({
        error: false,
        message: "Question already exists. No update required.",
        data: chat,
      });
    } else {
      // If the question does not exist, push the new question-answer to the array
      chat.questionAnswer.push({
        question: questionAnswer[0].question,
        answer: questionAnswer[0].answer,
      })
    }

    // Save the updated chat document
    await chat.save();
    const data = await Chat.findOne({ _id: chatId });
    res.status(202).send({
      error: false,
      data,
    });
  },

  delete: async (req, res) => {
    const { chatId } = req.body;
    const data = await Chat.deleteOne({ _id: chatId });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !!!data.deletedCount,
      data,
    });
  },
};
