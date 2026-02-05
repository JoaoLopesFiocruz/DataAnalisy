import express from "express"
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.json({"sucess":true,"message":"API rodando"})
});

export default router;
