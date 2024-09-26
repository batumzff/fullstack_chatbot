const {
    mongoose: { Schema, model },
  } = require("../configs/dbConnection");
  
  const QuestionSchema = new Schema(
    {
  
      text: {
        type:String,
        trim:true,
        required:true,
      },
      order:Number,
      nextQuestion:Number,
      
    },
    {
      collection: "questions",
      timestamps: true,
    }
  );
  
  module.exports = model("Question", QuestionSchema);
  