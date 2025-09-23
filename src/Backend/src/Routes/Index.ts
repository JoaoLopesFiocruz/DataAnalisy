import main from "../Controulers/Index";
import { Router, Request, Response } from "express";

const router = Router();

router.get("/",main.Test);

export default router;
