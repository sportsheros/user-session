const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require('@constants/index');
let OrderSchema = new mongoose.Schema(
  {    
    sellerId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref:"Users" },
    buyerId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref:"Users" },
    items:[{type: mongoose.Schema.Types.ObjectId, required: true, ref:"Products"}]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Orders", OrderSchema, 'orders');