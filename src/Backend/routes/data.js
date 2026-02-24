import express from "express"
import authors from "./Data/authors.js"
import subject from "./Data/subject.js"
import data from "./Data/data.js"
var router = express.Router();
router.use("/data",data)
router.use("/authors",authors)
router.use("/subjects",subject)
export default router;
