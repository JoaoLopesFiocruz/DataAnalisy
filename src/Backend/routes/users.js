var express = require('express');
var router = express.Router();
const pool = require('../DB/Config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user=require('../Controlers/Javascript/Users/Users')

router.post('/',user.CreateRouter);

router.put('/Login', user.Login);

router.get('/:id(\\d+)', user.verifyLogin, user.correctLogin, user.GetByID);
router.put('/:id(\\d+)', user.verifyLogin, user.correctLogin, user.UpdateRouter);
router.delete('/:id(\\d+)', user.verifyLogin, user.correctLogin, user.DeleteRouter);
module.exports = router;