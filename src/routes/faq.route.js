import { Router } from "express";
import { createFAQ } from "../controller/faq.controller.js";


const router=Router();

router
.route("/create")
.post(createFAQ)

export default router;