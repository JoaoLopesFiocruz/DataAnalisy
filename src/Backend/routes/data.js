import express from "express"
var router = express.Router();
import authors from "./Data/authors.js"
router.use("/Authors",authors)
export default router;
