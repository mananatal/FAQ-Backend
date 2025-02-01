import { Router } from "express";
import { createFAQ ,fetchFAQs} from "../controller/faq.controller.js";


const router=Router();

router
.route("/create")
.post(createFAQ);

router
.route("/")
.get(fetchFAQs);

export default router;