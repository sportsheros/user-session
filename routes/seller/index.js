const express = require("express");
const router = express.Router();
const SellerController = require("@controllers/api/seller/seller");
const Validation = require('@validation/index')
const Responder = require('@service/responder')
const Auth = require('@middleware/sellerAuth');

router.use(Auth)

router.post("/create-catalog",Validation.AddCatalogs(), Responder.validate.bind(Responder),SellerController.AddCatalogs.bind(SellerController));
router.get("/orders", SellerController.RetrievelistOfOrders.bind(SellerController));



module.exports = router;
