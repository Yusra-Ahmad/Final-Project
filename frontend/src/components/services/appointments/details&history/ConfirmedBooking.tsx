import React, { useEffect, useState } from 'react';
import { useUser } from '../../../../context/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import "./ConfirmedBooking.scss"
// import './Appointments.scss';

const ConfirmedBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(
          `http://localhost:3020/bookingConfirm/${user._id}`, 
          config
        );
        const data = await response.json();
        setBookings(data); // Set the bookings state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-confirmations">
      <div className='booking-border'>

      <h1>My Booking History</h1>
      <div className="booking-container">

      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <div className="booking-details" key={booking._id}>

            <li >
              <p><span>Service: </span>{booking.service}</p>
              <p><span>Start Time:</span> {new Date(booking.startTime).toLocaleString()}</p>
              <p><span>Price: </span>{booking.price}€</p>
      
            </li>
            </div>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
      </div>
      </div>
    </div>
  );
};

export default ConfirmedBooking;
