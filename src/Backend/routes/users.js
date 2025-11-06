var express = require('express');
var router = express.Router();
const pool = require('../DB/Config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user=require('../Controlers/Javascript/Users')
/* GET users listing. */
router.get('/',user.GetRouter);
router.post('/',user.CreateRouter)
module.exports = router;
