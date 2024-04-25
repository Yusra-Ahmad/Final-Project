import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Appointments.scss";
import { useServiceContext } from "../../../context/serviceContext.tsx";

const Appointment = () => {
  const { services, fetchServices } = useServiceContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<any>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDateSelect = (date: Date | Date[]) => {
    setSelectedDate(date instanceof Date ? date : null);
    // console.log(e.target);
  };
  // const handleDate = (e)=>{
  //   console.log(e.target);
  // }

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedDate && selectedService && selectedTime) {
      // Find the selected service object
      const selectedServiceObj = services.find(service => service.title === selectedService);
      if (selectedServiceObj) {
        // Extract the price from the selected service object
        const price = selectedServiceObj.price;
        // Calculate the total by parsing the price to a number
        const total = parseFloat(price) || 0;
        // Update the submitted data state
        setSubmittedData({
          date: selectedDate,
          service: selectedService,
          time: selectedTime,
          price: price,
          total: total
        });
      }
      setSelectedDate(null);
      setSelectedService("");
      setSelectedTime("");
    } else {
      console.error("Please select date, service, and time");
    }
  };
  
  return (
    <>
      <div className="appointment-container">
        <div className="appointment-form">
          <h1>Book an Appointment</h1>
          <form onSubmit={handleSubmit}>
            <div className="div-container">
              <div
                className="calendar-container"
                style={{ overflow: "hidden" }}
                >
                <h3>Select your date for Service:</h3>
                <Calendar
                  // onChange={(e)=>handleDate(e)}
                  onChange={handleDateSelect}
                  value={selectedDate}
                  />
              </div>
              <div className="service-select-container">
                <h3>Select your Service:</h3>
                <select
                  name="services"
                  id="booking-service"
                  value={selectedService}
                  onChange={handleServiceChange}
                  >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>
                      {service.title}</option>
                  ))}
                </select>
                <div className="time-slot">
                  <h3 className="time-slot">
                    Select the time Slot for Service:
                  </h3>
                  <select
                    name="time slot"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    >
                    <option value="">Select a time</option>
                    <option value="10:00 am">10:00 am</option>
                    <option value="11:00 am">11:00 am</option>
                    <option value="12:00 pm">12:00 pm</option>
                    <option value="1:00 pm">1:00 pm</option>
                    <option value="2:00 pm">2:00 pm</option>
                    <option value="3:00 pm">3:00 pm</option>
                    <option value="4:00 pm">4:00 pm</option>
                    <option value="5:00 pm">5:00 pm</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="submit-button">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className="data-div">
                    <h2>Summary</h2>
          {submittedData && (
            <div className="submitted-data">
              <p>Date: {submittedData.date.toDateString()}</p>
              <p>Service: {submittedData.service}</p>
              <p>Time: {submittedData.time}</p>
              <p>Price: {submittedData.price}€</p>
              <h3>Total:{submittedData.total}€</h3>
            </div>
          )}
        <button className="confirm-button">
  <span> Confirm
  </span>
</button>
        
          </div>
      </div>
    </>
  );
};

export default Appointment;
