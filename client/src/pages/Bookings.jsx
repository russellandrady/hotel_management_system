import { useDispatch, useSelector } from "react-redux";
import "../styles/style_for_bookings.css";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  bookingSubmitStart,
  bookingSubmitSuccess,
  bookingSubmitFailure,
  bookingGotAll,
  bookingGotAllFailure,
} from "../redux/user/userSlice";

export default function Bookings() {
  const dispatch = useDispatch();

  const { currentUser, bookings } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());

  const [formdata, setFormdata] = useState({
    checkin: setToMidnight(checkinDate),
    checkout: setToMidnight(checkoutDate),
  });
  function setToMidnight(date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleCheckinChange = (date) => {
    setFormdata({ ...formdata, checkin: setToMidnight(date).toISOString() });
    setCheckinDate(date);
  };

  const handleCheckoutChange = (date) => {
    setFormdata({ ...formdata, checkout: setToMidnight(date).toISOString() });
    setCheckoutDate(date);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(bookingSubmitStart());
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();

      if (data.success === false) {
        dispatch(bookingSubmitFailure(data.message));
        return;
      }
      dispatch(bookingSubmitSuccess());
      fetchData();
      setIsOpen(false);
      setFormdata({});
      setFormdata({
        checkin: setToMidnight(checkinDate),
        checkout: setToMidnight(checkoutDate),
      });
    } catch (error) {
      dispatch(bookingSubmitFailure(error));
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/booking/all");
      if (response.ok) {
        const data = await response.json();
        dispatch(bookingGotAll(data));
      } else {
        dispatch(bookingGotAllFailure("Failed to fetch data"));
      }
    } catch (error) {
      dispatch(bookingGotAllFailure(error));
    }
  };
  useEffect(() => {
    if (bookings.length === 0) {
      fetchData();
    }
  }, []);
  console.log(bookings);

  Modal.setAppElement("#root");
  return (
    <div>
      <div className="container-add">
        <button
          className="add-button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <HiOutlineSquaresPlus />
        </button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Hotel Address</th>
              <th>Room Number</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Number of Guests</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(bookings) ? bookings : []).map((booking) => (
              <tr key={booking._id}>
                <td>{booking.bookingname}</td>
                <td>{booking.address}</td>
                <td>{booking.roomnumber}</td>
                <td>{new Date(booking.checkin).toLocaleDateString()}</td>
                <td>{new Date(booking.checkout).toLocaleDateString()}</td>
                <td>{booking.noofguests}</td>
                <td>{booking.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        contentLabel="Booking Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            &times;
          </span>
          <form id="editForm" onSubmit={handleSubmit}>
            <label htmlFor="bookingname">Hotel Name</label>
            <br />
            <input
              type="text"
              id="bookingname"
              name="bookingname"
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="address">Hotel Address</label>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="roomnumber">Room Number</label>
            <br />
            <input
              type="number"
              id="roomnumber"
              name="roomnumber"
              onChange={handleChange}
              required
            />
            <br />

            <div className="date-picker-container">
              <div>
                <label htmlFor="checkin">Check-in Date</label>
                <br />
                <DatePicker
                  selected={checkinDate}
                  onChange={handleCheckinChange}
                  required
                  id="checkin"
                  name="checkin"
                />
              </div>
              <div>
                <label htmlFor="checkout">Check-out Date</label>
                <br />
                <DatePicker
                  selected={checkoutDate}
                  onChange={handleCheckoutChange}
                  required
                  id="checkout"
                  name="checkout"
                />
              </div>
            </div>
            <br />
            <label htmlFor="noofguests">Number of Guests</label>
            <br />
            <input
              type="number"
              id="noofguests"
              name="noofguests"
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              required
            />
            <br />
            <input type="submit" value="Add" />
          </form>
        </div>
      </Modal>
    </div>
  );
}
