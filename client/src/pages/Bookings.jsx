import { useDispatch, useSelector } from "react-redux";
import "../styles/style_for_bookings.css";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  bookingSubmitStart,
  bookingSubmitSuccess,
  bookingSubmitFailure,
  bookingGotAll,
  bookingGotAllFailure,
  bookingUpdateStart,
  bookingUpdateFailure,
  bookingUpdateSuccess,
  bookingDeleteFailure,
  bookingDeleteStart,
  bookingDeleteSuccess,
  signOut,
} from "../redux/user/userSlice";
import { Navigate } from "react-router-dom";

export default function Bookings() {
  const dispatch = useDispatch();

  const { currentUser, bookings, loading } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setmodalMode] = useState();
  const [selectedBooking, setselectedBooking] = useState([]);

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
        toast.error(data.message);
        return;
      }
      dispatch(bookingSubmitSuccess());
      toast.error("Added");
      fetchData();
      setIsOpen(false);
      setFormdata({});
      setFormdata({
        checkin: setToMidnight(checkinDate),
        checkout: setToMidnight(checkoutDate),
      });
    } catch (error) {
      dispatch(bookingSubmitFailure(error));
      toast.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(bookingUpdateStart());
      const res = await fetch(`/api/booking/update/${selectedBooking._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(bookingUpdateFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(bookingUpdateSuccess());
      toast.error("Updated");
      fetchData();
      setIsOpen(false);
      setFormdata({});
      setFormdata({
        checkin: setToMidnight(checkinDate),
        checkout: setToMidnight(checkoutDate),
      });
    } catch (error) {
      bookingUpdateFailure(error);
      toast.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(bookingDeleteStart());
      const res = await fetch(`/api/booking/delete/${selectedBooking._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(bookingDeleteFailure(data.message));
        toast.error(data.message);
        return;
      }

      dispatch(bookingDeleteSuccess());
      toast.error("Deleted");
      fetchData();
      setIsOpen(false);
      setFormdata({});
      setFormdata({
        checkin: setToMidnight(checkinDate),
        checkout: setToMidnight(checkoutDate),
      });
    } catch (error) {
      bookingDeleteFailure(error);
      toast.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
      Navigate("/");
    } catch (error) {
      toast.error(error);
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
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      dispatch(bookingGotAllFailure(error));
      toast.error(error);
    }
  };
  useEffect(() => {
    if (bookings.length === 0) {
      fetchData();
    }
  }, []);

  Modal.setAppElement("#root");
  return (
    <div>
      <div className="container-add">
        <button
          className="add-button"
          onClick={() => {
            setIsOpen(true);
            setmodalMode("Add");
            setselectedBooking([]);
            setFormdata({});
            setFormdata({
              checkin: setToMidnight(checkinDate),
              checkout: setToMidnight(checkoutDate),
            });
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
              <tr
                key={booking._id}
                onClick={() => {
                  setIsOpen(true);
                  setmodalMode("Update");
                  setselectedBooking(booking);
                  setCheckinDate(
                    new Date(booking.checkin).toLocaleDateString()
                  );
                  setCheckoutDate(
                    new Date(booking.checkout).toLocaleDateString()
                  );
                  setFormdata({
                    bookingname: booking.bookingname,
                    address: booking.address,
                    roomnumber: booking.roomnumber,
                    checkin: booking.checkin,
                    checkout: booking.checkout,
                    noofguests: booking.noofguests,
                    price: booking.price,
                  });
                }}
              >
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
          <form
            id="editForm"
            onSubmit={modalMode === "Add" ? handleSubmit : handleUpdate}
          >
            <label htmlFor="bookingname">Hotel Name</label>
            <br />
            <input
              type="text"
              id="bookingname"
              name="bookingname"
              onChange={handleChange}
              defaultValue={
                selectedBooking.length !== 0 ? selectedBooking.bookingname : ""
              }
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
              defaultValue={
                selectedBooking.length !== 0 ? selectedBooking.address : ""
              }
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
              defaultValue={
                selectedBooking.length !== 0 ? selectedBooking.roomnumber : ""
              }
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
                  minDate={checkinDate}
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
              defaultValue={
                selectedBooking.length !== 0 ? selectedBooking.noofguests : ""
              }
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
              defaultValue={
                selectedBooking.length !== 0 ? selectedBooking.price : ""
              }
              required
            />
            <br />
            <input type="submit" value={modalMode} disabled={loading} />
            {modalMode !== "Add" ? (
              <input type="button" className="delete-button" value="Delete" onClick={handleDelete} disabled={loading}/>
            ) : null}
          </form>
        </div>
      </Modal>
      <div className="sign-out-link">
        <p onClick={handleSignOut}>
          Signout
        </p>
      </div>
      {loading && (
        <div className="loading-icon">
          <AiOutlineLoading3Quarters className="icon" />
        </div>
      )}
    </div>
  );
}
