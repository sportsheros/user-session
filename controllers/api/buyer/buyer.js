const Mongoose = require("mongoose");
const ObjectId = Mongoose.Types.ObjectId;
const Users = require("@models/users/users");
const Constants = require('@constants/index');
const Catalogs = require("@models/catalogs/catalogs");
const Orders = require("@models/orders/orders");
const Responder = require('@service/responder')
const _ = require('lodash');

module.exports = {

  /* *
 * @api {get} api/buyer/list-of-sellers 
 * @apiDescription api to fetch  a list of all sellers
 * */

  async getListOfSellers(req, res) {
    try {   
      let result = await Users.find({userType:Constants.USER_TYPE.SELLERS});
      return Responder.respondWithSuccess(req, res, result, 'orders fetch successfully'); 
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }

  },
 /* *
 * @api {get} api/buyer/seller-catalog/:seller_id
 * @apiDescription api to fetch the catalog of a seller by seller_id
 * */
  async GetCatalogBySellerId(req, res) {
    try {
      const sellerId = req.params?.seller_id; 
      let result = await Catalogs.find({sellerId});
      return res.json({data: result,status:true,message :"Data fetch successfully"});
      }
      catch (error) {
        return Responder.respondWithError(req, res, error);
      }

    },
    
    
    /* * 
    * @api {post} api/buyer/create-order/:seller_id
 * @apiDescription api to Send a list of items to create an order for seller with id = seller_id
 * */
    async CreateOrderFromSeller(req, res) {
      try{
        const {items}= req.body;
        const sellerId = req.params?.seller_id;
        const buyerId = req.buyer?.id;
        let result = await new Orders({sellerId,buyerId,items}).save();
        return Responder.respondWithSuccess(req, res, result, 'order created successfully');  
     }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }
      }
 
  };