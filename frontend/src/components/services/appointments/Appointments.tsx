import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar'
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
import "./Appointments.scss";
import { useServiceContext } from "../../../context/serviceContext.tsx";

const Appointment = () => {
  const { services, fetchServices } = useServiceContext();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDateSelect = (date: Date | Date[]) => {
    // If you want to allow selecting only one date, you can directly set the selectedDate state
    setSelectedDate(date instanceof Date ? date : null);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedDate && selectedService && selectedTime) {
      // Perform booking with selected date, service, and time
      console.log("Booking details:", {
        date: selectedDate,
        service: selectedService,
        time: selectedTime,
      });
      // Reset state after booking
      setSelectedDate(null);
      setSelectedService("");
      setSelectedTime("");
    } else {
      console.error("Please select date, service, and time");
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-form">
      <h1>Book an Appointment</h1>
        <form onSubmit={handleSubmit}>
          <div className="div-container">
            <div className="calendar-container"  style={{ overflow: 'hidden' }}>
              <h3>Select your date for Service:</h3>
              {/* <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  weekends={false}
                  selectable={true}
                  select={handleDateClick}
                  eventColor="#B08568" // Set event color
                  eventTextColor="#ffffff" // Set event 
                //   height= "auto"
              /> */}
              <Calendar
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
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
              <div className="time-slot">
                <h3 className="time-slot">Select the time Slot for Service:</h3>
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
          <div className="button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
