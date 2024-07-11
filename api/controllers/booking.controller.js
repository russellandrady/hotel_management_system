import Booking from "../models/booking.model.js";

export const createBooking = async (req, res, next) => {
  const {
    bookingname,
    address,
    roomnumber,
    checkin,
    checkout,
    noofguests,
    price,
  } = req.body;
  const newBooking = Booking({
    bookingname,
    address,
    roomnumber,
    checkin,
    checkout,
    noofguests,
    price,
    user: req.user.id,
  });
  try {
    await newBooking.save();
    res.status(203).json({ message: "Booking created successfully" });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    console.log(bookings);
    res.status(203).json(bookings);
  } catch (err) {
    next(err);
  }
};
export const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          bookingname: req.body.bookingname,
          address: req.body.address,
          roomnumber: req.body.roomnumber,
          checkin: req.body.checkin,
          checkout: req.body.checkout,
          noofguests: req.body.noofguests,
          price: req.body.price,
        },
      },
      { new: true } 
    );
    if (updatedBooking === null) {
      return next(errorHandler(404, "Booking not found"));
    }
    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted");
  } catch (err) {
    next(err);
  }
};
