import Data from "../../Controlers/Javascript/Data/Data.js"
import express from "express"
var router = express.Router();
/* GET home page. */
router.get('/', Data.SubjectCountRoute);

export default router;