"use strict";

const Question = require("../models/question");

module.exports = {
  list: async (req, res) => {
    const data = await Question.find();

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    const data = await Question.create(req.body);

    res.status(201).send({
      error: false,

      data,
    });
  },

  read: async (req, res) => {
    const data = await Question.findOne({ _id: req.params.questionId });
    

    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    await Question.updateOne({ _id: req.params.questionId}, req.body, {
      runValidators: true,
    });
    const data = await Question.findOne({ _id: req.params.questionId });
    res.status(202).send({
      error: false,
      data,
    });
  },

  delete: async (req, res) => {
    const data = await Question.deleteOne({ _id: req.params.questionId });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !(!!data.deletedCount),
      data,
    });
  },
};
