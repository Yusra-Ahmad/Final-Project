import React from "react";
import { Link } from "react-router-dom";
import "./BookingDetails.scss";
import { useServiceContext } from "../../../../context/serviceContext";

const BookingDetail = () => {
  const { bookingDetail } = useServiceContext();
  const totalAmount = bookingDetail.reduce((total, item) => total + item.price, 0);
console.log("this is booking details", bookingDetail);
  return (
    <div className="wrap-container">
    <div className="booking-details-container">
      <h2>Booking is Confirmed</h2>
      {bookingDetail.map((item, index) => (
        <div key={index} className="booking-detail">
          <p>{index + 1}. Service: {item.service}</p>
          <p>Date: {new Date(item.startTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>Time: {new Date(new Date(item.startTime).getTime() - 2 * 60 * 60 * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          <p>Price: {item.price}€</p>
        </div>
      ))}
      <div className="total-amount">
        <p>Total Amount: {totalAmount}€</p>
      </div>
      <Link to="/book-appointment"> 
        <button className="home-button">
          <span>Go Back</span>
        </button>
      </Link>
    </div>
      </div>
  );
};

export default BookingDetail;