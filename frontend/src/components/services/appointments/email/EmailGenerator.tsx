import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";

const EmailGenerator = ({ sendConfirmation, userData, bookingDetails }) => {
  const [confirmationSent, setConfirmationSent] = useState(false);

  const sendConfirmationEmail = async () => {
    try {
      const adjustedStartTime = new Date(bookingDetails.startTime);
    adjustedStartTime.setHours(adjustedStartTime.getHours() - 2);
      const templateParams = {
        to_name: userData.firstname,
        user_email: "yusra.ahmad@dci-student.org",//userData.email,
        service_name: bookingDetails.service,
        date_booking: new Date(bookingDetails.startTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        time_booking:adjustedStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price_booking: bookingDetails.price,
      };
console.log("this is time",adjustedStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),);
      await emailjs.send(
        "service_90mywz9",
        "template_qog1s6h",
        templateParams,
      );

      setConfirmationSent(true);
      console.log("Confirmation email sent successfully");
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  };

  useEffect(() => {
    emailjs.init("uq8xQ_jnM6FacK9rL")
    if (sendConfirmation) {
      sendConfirmationEmail();
    }
  }, [sendConfirmation]);

  return <div>{confirmationSent ? <p>Confirmation email sent!</p> : null}</div>;
};

export default EmailGenerator;