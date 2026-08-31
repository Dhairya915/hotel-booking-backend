import { Router } from "express";
import { bookDateHandler } from "../controllers/availability.controller.js";

const router = Router();

router.post("/availability/book", bookDateHandler);

export default router;