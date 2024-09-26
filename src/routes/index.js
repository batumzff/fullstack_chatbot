"use strict"
const router = require('express').Router()
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))
// chat:
router.use('/chats', require('./chat'))
// question:
router.use('/questions', require('./question'))

/* ------------------------------------------------------- */
module.exports = router