import express from "express"
import authors from "./Data/authors.js"
import subject from "./Data/subject.js"
var router = express.Router();
router.use("/Authors",authors)
router.use("/Subjects",subject)
export default router;
