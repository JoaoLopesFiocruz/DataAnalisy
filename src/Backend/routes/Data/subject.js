import Subject from "../../Controlers/Javascript/Data/subject.js"
import express from "express"
var router = express.Router();

/* GET home page. */
router.get('/', Subject.SubjectCountRoute);

export default router;