const Mongoose = require("mongoose");
const Crypto = require("crypto-js");
const ObjectId = Mongoose.Types.ObjectId;
const jwt = require("jsonwebtoken");
const Users = require("@models/users/users");
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
    email: payload.email,
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
     const {email,password,name,mobile} = req.body;  
     let result;
     result = await Users.findOne({email});
     if(!_.isEmpty(result)) return Responder.respondWithError(req, res, `email Already exists`);
      let hashPassword = await hashCode(password);
      result = await new Users({email,mobile,name,password:hashPassword}).save();
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
    const {email,password}= req.body;
    let condition = {
      email,
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
    
  };