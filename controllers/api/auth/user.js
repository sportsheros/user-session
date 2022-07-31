const Mongoose = require("mongoose");
const Crypto = require("crypto-js");
const ObjectId = Mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const Users = require("@models/users/users");
const Products = require("@models/products/products");
const Responder = require('@service/responder')
const _ = require('lodash');


function hashCode(password) {  
return Crypto.HmacSHA256(
  password,
    process.env.SALT.toString()
  ).toString();
}
function generateToken(payload){
  let user = {
    userName: payload.userName,
    userType: payload.userType,
    id: payload._id,
  };
  return  jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_INTERVAL,
  });
}

module.exports = {

  /* *
 * @api {post} api/auth/register
 * @apiDescription api  is Used to user register
 * */

  async userRegister(req, res) {
    try {  
     const {userName,password,userType} = req.body;  
     let result;
     result = await Users.findOne({userName});
     if(!_.isEmpty(result)) return Responder.respondWithError(req, res, `userName Already exists`);
      let hashPassword = await hashCode(password);
      result = await new Users({userName,userType,password:hashPassword}).save();
      if(result){
        result.token = await generateToken(result);
       await result.save();
      }
      return Responder.respondWithSuccess(req, res, result.token, 'Data Submited successfully');
     
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }
  },
   /* *
 * @api {post} api/auth/login
 * @apiDescription api  is Used to user login
 * */
  async userLogin(req, res) {
    try {    
    const {userName,password}= req.body;
    let condition = {
      userName,
    };
    if (!process.env.JWT_SECRET_KEY || !process.env.SALT) return Responder.respondWithError(req, res, `Selt and key not found`);
    let userExist = await Users.findOne(condition);
    if (!userExist) return Responder.respondWithError(req, res, `User not exists`);
    if (userExist.password == Crypto.HmacSHA256(password, process.env.SALT).toString()) {
      userExist.token = await generateToken(userExist);
      await userExist.save();
    }
    return Responder.respondWithSuccess(req, res, userExist.token, 'Login successfully');
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }
  },
  /* *
 * @api {post} api/auth/add_Product
 * @apiDescription api  is Used to Add Product
 * */
  async AddProduct(req, res) {
    try {  
     const {name,price} = req.body;  
     let result;
     result = await Products.findOne({name});
     if(!_.isEmpty(result)) return Responder.respondWithError(req, res, `Product Already exists`);
      result = await new Products(req.body).save();
      return Responder.respondWithSuccess(req, res, result, 'Data Submited successfully');
     
    }
    catch (error) {
      return Responder.respondWithError(req, res, error);
    }
  }
 
  };