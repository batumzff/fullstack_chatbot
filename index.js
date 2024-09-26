"use strict";

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:
const path = require('node:path')

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:
app.use(express.static(path.join(__dirname, '/client/dist'))) // Static Files

// Accept JSON:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());


// Auhentication:
app.use(require("./src/middlewares/authentication"));


/* ------------------------------------------------------- */
// Routes:

// routes/index.js:
app.use("/api/v1", require("./src/routes/"));

// HomePath:
app.all("/api/v1", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to CHATBOT API",
    user: req.user,
  });
  
});



app.all("/api/v1/*", (req, res) => {

  res.status(404).send({
    error: true,
    message: "This route is not valid",
  });
});

// Serve index.html for all other routes (for frontend routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

/* ------------------------------------------------------- */



// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
