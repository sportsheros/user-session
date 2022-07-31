const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require('@constants/index');
let ProductSchema = new mongoose.Schema(
  {
    
    name: { type: String, require: true },    
    price: { type: String, require: true }    
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Products", ProductSchema, 'products');