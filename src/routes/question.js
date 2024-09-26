"use strict";
const router = require("express").Router();
/*-------------------------------------------------------*/
// Question Routes:

const Question = require("../controllers/question");
const {isAdmin} = require("../middlewares/permissions")


router
.route("/")
.get(Question.list)
.post(isAdmin,Question.create);

router
  .route("/:questionId")
  .get(Question.read)
  .put(isAdmin,Question.update)
  .patch(isAdmin,Question.update)
  .delete(isAdmin,Question.delete);
/*-------------------------------------------------------*/
module.exports = router;
