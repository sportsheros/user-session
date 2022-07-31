const express = require('express')
const router = express.Router()
const auths = require('@root/routes/auth/index');
const buyers = require("@root/routes/buyer/index");
const sellers = require("@root/routes/seller/index");


router.use('/auth', auths);
router.use('/buyer', buyers);
router.use('/seller', sellers);


module.exports = router;
