"use strict";
const router = require("express").Router();
/*-------------------------------------------------------*/
// Chat Routes:

const Chat = require("../controllers/chat");
const { isAdmin } = require("../middlewares/permissions");

router
  .route("/")
  .get(Chat.list)
  .post(Chat.create)
  .put(Chat.update)
  .patch(Chat.update)
  .delete(isAdmin, Chat.delete);
  router.route("/:chatId").get(Chat.read)
/*-------------------------------------------------------*/
module.exports = router;
