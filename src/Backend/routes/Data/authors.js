import Authors from "../../Controlers/Javascript/Data/Authors.js"
import express from "express"
var router = express.Router();

/* GET home page. */
router.put('/', Authors.MostImportantsRoute);

export default router;