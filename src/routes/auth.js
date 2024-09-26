"use strict";
const router = require("express").Router();
/*-------------------------------------------------------*/
// Auth Routes:

const Auth = require("../controllers/auth");

router.post("/login", Auth.login);
router.get("/logout", Auth.logout);

module.exports = router;
