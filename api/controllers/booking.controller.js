import Booking from "../models/booking.model.js";

export const createBooking = async (req, res, next) => {
    const { bookingname, address, roomnumber, checkin, checkout, noofguests, price } = req.body;
    const newBooking = Booking({bookingname, address, roomnumber, checkin, checkout, noofguests, price, user: req.user.id});
    try{
    await newBooking.save();
    res.status(203).json({ message: "Booking created successfully" });
    }
    catch(err){
        next(err);
        console.log(err);
    }
};
