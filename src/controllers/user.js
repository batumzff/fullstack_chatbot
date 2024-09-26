"use strict";

const { encryptFunc } = require("../helpers/validationHelpers");
const User = require("../models/user");
const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    const auth = req.headers?.authorization || null;
    const token = auth ? auth.split(" ")[1] : null;
    if (!token) {
      throw new Error("Please log in first");
    }

    const data = await User.find();

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    req.body.isAdmin = false; //* if user sends isAdmin = true it would be accepted as false
    const data = await User.create(req.body);

    // //! AUTO LOGIN:

    const tokenData = await Token.create({
      userId: data._id,
      token: encryptFunc(data._id + Date.now()),
    });
    // const user = await User.findOne({username: data?.username })
    res.status(201).send({
      error: false,
      token: tokenData.token,
      data,
      
    });
  },

  read: async (req, res) => {
    const customFilters = req.user?.isAdmin
      ? { _id: req.params.userId }
      : { _id: req.user._id }; //! if the user is not Admin only his/her own record he/she could see

    const data = await User.findOne({ ...customFilters });

    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    if (!req.user?.isAdmin) {
      //! if the user is not Admin, he/she cannot change isAdmin status

      delete req.body.isAdmin;
    }
    const customFilter = !req.user?.isAdmin
      ? { _id: req.user?._id }
      : { _id: req.params.userId };
    await User.updateOne({ ...customFilter }, req.body, {
      runValidators: true,
    });
    const data = await User.findOne({ ...customFilter });
    res.status(202).send({
      error: false,
      data,
    });
  },

  delete: async (req, res) => {

    const data = await User.deleteOne({ _id: req.params.userId})
    
    res.status(data.deletedCount ? 204 : 404).send({
      error: !!!data.deletedCount,
      data,
    });
  },
};
