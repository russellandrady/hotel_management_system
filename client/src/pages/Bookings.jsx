import { useSelector } from "react-redux";
import "../styles/style_for_bookings.css";
import { HiOutlineSquaresPlus } from "react-icons/hi2";

export default function Bookings() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <div className="container-add">
        <button className="add-button" >
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
            <tr>
              <td>Grand Plaza</td>
              <td>123 Main St</td>
              <td>101</td>
              <td>2024-07-15</td>
              <td>2024-07-20</td>
              <td>2</td>
              <td>2000</td>
            </tr>
            <tr>
              <td>Sunset Resort</td>
              <td>456 Beach Ave</td>
              <td>205</td>
              <td>2024-08-01</td>
              <td>2024-08-07</td>
              <td>4</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Mountain Lodge</td>
              <td>789 Hill Rd</td>
              <td>303</td>
              <td>2024-09-10</td>
              <td>2024-09-15</td>
              <td>3</td>
              <td>10000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
