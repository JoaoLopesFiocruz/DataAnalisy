var express = require('express');
var router = express.Router();
const pool = require('../DB/Config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user=require('../Controlers/Javascript/Users/Users');
const { json } = require('stream/consumers');

router.post('/',user.CreateRouter);

router.put('/Login', user.Login);
router.put("/ValidToken",user.verifyLogin,(req,res)=>{return res.status(200).json({
    Message: "Pemission given",
    Status: 200,
    Sucess: true
})})
router.get('/:id(\\d+)', user.verifyLogin, user.correctLogin, user.GetByID);
router.put('/:id(\\d+)', user.verifyLogin, user.correctLogin, user.UpdateRouter);
router.delete('/:id(\\d+)', user.verifyLogin, user.correctLogin, user.DeleteRouter);
router.put("/Pasword",user.verifyLogin,user.PasswordChangeRoute)

module.exports = router;