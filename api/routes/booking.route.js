import express from "express";
import { createBooking, getAllBookings } from "../controllers/booking.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createBooking)
router.get("/all", verifyToken, getAllBookings);

export default router;