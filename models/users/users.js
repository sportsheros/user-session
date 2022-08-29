const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require('@constants/index');
let Userschema = new mongoose.Schema(
  {
  email: { type: String, require: true },
  name:{ type: String },
  password: { type: String, require: true },
  mobile:{type:String},
  token: { type: String },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Users", Userschema, 'users');