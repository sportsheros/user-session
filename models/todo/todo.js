const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require('@constants/index');
let TaskSchema = new mongoose.Schema(
  {
    
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    tasks: [
        {
            title: { type: String, required: true },
            priority:{type:String, enum:  Object.values(Constants.PRIORITY)},
            description: { type: String}
        }
    ],
    isActive: { type: Boolean, default: true },   
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("TodoTask", TaskSchema, 'todo_task');