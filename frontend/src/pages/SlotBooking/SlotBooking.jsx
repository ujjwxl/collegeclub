import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import backgroundImage from "../../assets/home-1.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./SlotBooking.css";

function SlotBooking() {

  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [queryType, setQueryType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  const currentHour = new Date().getHours();
  const currentDate = new Date().getDate();
  const selectedDay = selectedDate ? selectedDate.getDate() : currentDate;

  const slotOptions = [];

  if (selectedDate && selectedDay === currentDate) {
    for (let hour = currentHour + 1; hour <= 19; hour++) {
      slotOptions.push(`${hour}:00 - ${hour + 1}:00`);
    }
  } else {
    for (let hour = 9; hour <= 19; hour++){
      slotOptions.push(`${hour}:00 - ${hour + 1}:00`);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Booking details:", name, contactNumber, queryType, selectedDate, selectedSlot);

    try {
      await axios.post('http://localhost:5000/slot/book', {
        name,
        contactNumber,
        queryType,
        selectedDate,
        selectedSlot
      })
        .then(res => {
          if (res.status == 200) {
            toast("Slot booked successfully!");
          }
        })
        .catch(e => {
          toast("Slot could not be booked!");
          console.log(e);
        })
    }
    catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Navbar />
      <img src={backgroundImage} alt="" className="slot-background-image" />
      <div className="dashboard-overlay dashboard-container slot-form-overlay">
        <div className="slot-details-page">
          <div className="slot-details">
            <h2>Slot Booking</h2>
            <form onSubmit={handleSubmit}>

              <div className="form-input-group form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-input-group form-group">
                <label>Contact Number:</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-input-group form-group">
                <label>Query Type:</label>
                <select
                  className="slot-booking-select"
                  value={queryType}
                  onChange={(e) => setQueryType(e.target.value)}
                  required
                >
                  <option value="">Select Query Type</option>
                  <option value="college">College</option>
                  <option value="course">Course</option>
                  <option value="skills">Skills</option>
                </select>
              </div>
              <div className="form-input-group form-group">
                <label>Select Date:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()} // Set minimum date to current date
                  required
                />
              </div>

              <div className="form-input-group form-group">
                <label>Select Slot:</label>
                <select
                  className="slot-booking-select"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  required
                >
                  <option value="">Select Slot</option>
                  {slotOptions.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="form-submit-button">Book Slot</button>
            </form>

          </div>

          <div className="slot-booking-page-right">
            <img src={backgroundImage} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SlotBooking;
