
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useServiceContext } from "../../../../context/serviceContext";

const EmailGenerator = ({
  sendConfirmation,
  userData,
  totalPrice,
  // handleConfirmation,
}) => {
  const {summary}=useServiceContext();
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [template, setTemplate] = useState({});

  const sendConfirmationEmail = async () => {
    const formattedTemplate = {      
        to_name: userData.firstname,
      user_email: "yusra.ahmad@dci-student.org", //userData.email,
       total_amount:totalPrice,
    };
    try {
      for (const item of summary) {
        const nameOfBooking = `booking ${item.service}`;
        const adjustedStartTime = new Date(item.startTime);
        adjustedStartTime.setHours(adjustedStartTime.getHours() - 2);
        const bookingDetail = {
          service_name: item.service,
          date_booking: new Date(item.startTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time_booking: adjustedStartTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price_booking: item.price,
        };
      
        Object.assign(formattedTemplate, { [nameOfBooking]: bookingDetail });
      }
      console.log("formattedTemplate", formattedTemplate);
      // console.log("this is template", template);
      // console.log(adjustedStartTime);
      // const templateParams = {
      //   to_name: userData.firstname,
      //   user_email: "yusra.ahmad@dci-student.org",//userData.email,
      //   };
      await emailjs.send(
          "service_90mywz9",
          "template_qog1s6h",
          formattedTemplate,
        );

      setConfirmationSent(true);
      // console.log("this is booking Detials", bookingDetails);
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

};

export default EmailGenerator;
