const express = require("express");
const router = express.Router();
const UserController = require("@controllers/api/auth/user");
const Validation = require('@validation/index')
const Responder = require('@service/responder')

router.post("/register",Validation.registration(), Responder.validate.bind(Responder),UserController.userRegister.bind(UserController));
router.post("/login", Validation.login(), Responder.validate.bind(Responder),UserController.userLogin.bind(UserController));
router.post("/add_product", Validation.AddProducts(), Responder.validate.bind(Responder),UserController.AddProduct.bind(UserController));


module.exports = router;
