const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Constants = require('@constants/index');
let Catalogschema = new mongoose.Schema(
  {    
    name: { type: String, require: true },    
    sellerId:{ type: mongoose.Schema.Types.ObjectId, required: true, ref:"Users" },
    items:[{type: mongoose.Schema.Types.ObjectId, required: true, ref:"Products"}]
  }, 
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Catalogs", Catalogschema, 'catalogs');