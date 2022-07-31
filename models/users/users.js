const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require('@constants/index');
let Userschema = new mongoose.Schema(
  {
   userName: { type: String, require: true },
   userType: {
    type: String,    
    enum:  Object.values(Constants.USER_TYPE),
    require: true
  },
  password: { type: String, require: true },
  token: { type: String },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Users", Userschema, 'users');