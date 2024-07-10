import express from "express";
import { createBooking } from "../controllers/booking.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createBooking)

export default router;