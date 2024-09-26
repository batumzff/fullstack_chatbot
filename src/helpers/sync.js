"use strict";

// sync():

module.exports = async function () {
  // return null;

  /* CLEAR DATABASE */
  const { mongoose } = require("../configs/dbConnection");
  await mongoose.connection.dropDatabase();
  console.log("- Database and all data DELETED!");
  /* CLEAR DATABASE */
  const User = require("../models/user");

  await User.create([
    {
      _id: "65343222b67e9681f937f511",
      username: "admin",
      password: "aA?123456",
      email: "admin@site.com",
      isAdmin: true,
    },

    {
      _id: "65343222b67e9681f937f514",
      username: "Ali",
      password: "aA?123456",
      email: "ali@site.com",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f515",
      username: "Veli",
      password: "aA?123456",
      email: "veli@site.com",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f516",
      username: "Aydan",
      password: "aA?123456",
      email: "aydan@site.com",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f517",
      username: "Canan",
      password: "aA?123456",
      email: "canan@site.com",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f518",
      username: "Emel",
      password: "aA?123456",
      email: "emel@site.com",
      isAdmin: false,
    },
  ]);

  console.log("---Users added---");

  const Question = require("../models/question")
  await Question.create([
    {
      "_id": "64f2b947cfe5fa36a59871b2",
      "text": "Do you like animals?",
      "order": 1,
      "nextQuestion": 2
    },
    {
      "_id": "64f2b947cfe5fa36a59871b3",
      "text": "What is your age?",
      "order": 2,
      "nextQuestion": 3
    },
    {
      "_id": "64f2b947cfe5fa36a59871b4",
      "text": "Do you like programming?",
      "order": 3,
      "nextQuestion": 4
    },
    {
      "_id": "64f2b947cfe5fa36a59871b5",
      "text": "What is your favorite language?",
      "order": 4,
      "nextQuestion": 5
    },
    {
      "_id": "64f2b947cfe5fa36a59871b6",
      "text": "What is your favorite breed of cat, and why?",
      "order": 5,
      "nextQuestion": 6
    },
    {
      "_id": "64f2b947cfe5fa36a59871b7",
      "text": "How do you think cats communicate with their owners?",
      "order": 6,
      "nextQuestion": 7
    },
    {
      "_id": "64f2b947cfe5fa36a59871b8",
      "text": "Have you ever owned a cat? If so, what was their name and personality like?",
      "order": 7,
      "nextQuestion": 8
    },
    {
      "_id": "64f2b947cfe5fa36a59871b9",
      "text": "Why do you think cats love to sleep in small, cozy places?",
      "order": 8,
      "nextQuestion": 9
    },
    {
      "_id": "64f2b947cfe5fa36a59871ba",
      "text": "What’s the funniest or strangest behavior you’ve ever seen a cat do?",
      "order": 9,
      "nextQuestion": 10
    },
    {
      "_id": "64f2b947cfe5fa36a59871bb",
      "text": "Do you prefer cats or kittens, and what’s the reason for your preference?",
      "order": 10,
      "nextQuestion": 11
    },
    {
      "_id": "64f2b947cfe5fa36a59871bc",
      "text": "Why do you think cats are known for being independent animals?",
      "order": 11,
      "nextQuestion": 12
    },
    {
      "_id": "64f2b947cfe5fa36a59871bd",
      "text": "How do you think cats manage to land on their feet when they fall?",
      "order": 12,
      "nextQuestion": 13
    },
    {
      "_id": "64f2b947cfe5fa36a59871be",
      "text": "What’s your favorite fact or myth about cats?",
      "order": 13,
      "nextQuestion": 14
    },
    {
      "_id": "64f2b947cfe5fa36a59871bf",
      "text": "How would you describe the relationship between humans and cats in three words?",
      "order": 14,
      "nextQuestion": null
    }
  ]
  )
console.log("---Questions added---")
};

