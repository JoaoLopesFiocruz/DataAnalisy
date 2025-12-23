var express = require('express');
var router = express.Router();
const pool = require('../DB/Config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user=require('../Controlers/Javascript/Users/Users')

router.get('/', user.GetRouter);
router.post('/', user.CreateRouter);

// ROTAS ESPECÍFICAS PRIMEIRO
router.put('/Login', user.Login);

// ROTAS GENÉRICAS DEPOIS
router.get('/:id', user.GetByID);
router.put('/:id', user.UpdateRouter);
router.delete('/:id', user.DeleteRouter);

module.exports = router;