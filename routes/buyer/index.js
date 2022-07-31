const express = require("express");
const router = express.Router();
const BuyerController = require("@controllers/api/buyer/buyer");
const Validation = require('@validation/index')
const Responder = require('@service/responder')
const Auth = require('@middleware/buyerAuth');

router.use(Auth)

router.post("/create-order/:seller_id",Validation.CreateOrder(), Responder.validate.bind(Responder),BuyerController.CreateOrderFromSeller.bind(BuyerController));
router.get("/list-of-sellers",BuyerController.getListOfSellers.bind(BuyerController));
router.get("/seller-catalog/:seller_id", BuyerController.GetCatalogBySellerId.bind(BuyerController));



module.exports = router;
