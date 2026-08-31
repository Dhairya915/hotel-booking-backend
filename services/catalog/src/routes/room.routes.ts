import { Router } from "express";
import { createRoomHandler , getRoomsHandler } from "../controllers/room.controller";

const router = Router();

router.post("/rooms", createRoomHandler);
router.get("/hotels/:hotelId/rooms" , getRoomsHandler);

export default router;