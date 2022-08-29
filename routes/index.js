const express = require('express')
const router = express.Router()
const auths = require('@root/routes/auth/index');
const todos = require("@root/routes/todo/index");



router.use('/auth', auths);
router.use('/todo', todos);



module.exports = router;
