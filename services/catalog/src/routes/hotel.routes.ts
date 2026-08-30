import { Router } from "express";
import { createHotelHandler , searchHotelsHandler } from "../controllers/hotel.controller";

const router = Router();

router.post('/hotels' , createHotelHandler);
router.get('/hotels' , searchHotelsHandler);

export default router;