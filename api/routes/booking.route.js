import express from "express";
import { createBooking, deleteBooking, getAllBookings, updateBooking } from "../controllers/booking.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createBooking)
router.get("/all", verifyToken, getAllBookings);
router.post("/update/:id", verifyToken, updateBooking);
router.delete("/delete/:id", verifyToken, deleteBooking);

export default router;