import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import bookingRoutes from "./routes/booking.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/api/auth", authRoutes);
app.use('/api/booking', bookingRoutes);

app.use((err,req,res,next) => {
  const statusCode = res.statusCode ||500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode,
  });
});