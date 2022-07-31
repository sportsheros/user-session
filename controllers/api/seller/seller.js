const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const Catalogs = require("@models/catalogs/catalogs");
const Orders = require("@models/orders/orders");
const Products = require("@models/products/products");
const Responder = require('@service/responder')
const _ = require('lodash');

module.exports = {

  /* *
 * @api {post} api/seller/create-catalog
 * @apiDescription api to Send a list of items to create a catalog for a seller
 * */

  async AddCatalogs(req, res) {
    try {  
      const {name,items}= req.body;  
      let sellerId = req.seller.id;
      let result;
     result = await Catalogs.findOne({sellerId,name});
     if(!_.isEmpty(result)) return Responder.respondWithError(req, res, `Catalog Already exists with same name`);
      result = await new Catalogs({name,items,sellerId}).save();
      return Responder.respondWithSuccess(req, res, result, 'data submited successfully');  
     }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }
  },
  /* *
 * @api {get} api/seller/orders
 * @apiDescription api to Retrieve the list of orders received by a seller
 * */
  async RetrievelistOfOrders(req, res) {
    try {   
      let sellerId = req.seller.id;
      let result = await Orders.find({sellerId}).populate('buyerId',"userName").populate('items',"name price");
      return Responder.respondWithSuccess(req, res, result, 'orders fetch successfully'); 
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }
  } 
};