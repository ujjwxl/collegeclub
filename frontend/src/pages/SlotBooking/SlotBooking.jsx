import React, { useState } from "react";
import backgroundImage from "../../assets/home-1.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./SlotBooking.css";

function SlotBooking() {
  // State variables
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [queryType, setQueryType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // Initialize with null
  const [selectedSlot, setSelectedSlot] = useState('');

  // Generate slot options from 9am to 7pm
  const slotOptions = [];
  for (let hour = 9; hour <= 19; hour++) {
    slotOptions.push(`${hour}:00 - ${hour + 1}:00`);
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log("Booking details:", name, contactNumber, queryType, selectedDate, selectedSlot);
    // Reset form fields
    setName('');
    setContactNumber('');
    setQueryType('');
    setSelectedDate(null);
    setSelectedSlot('');
  };

  return (
    <div>
      <Navbar />
      <img src={backgroundImage} alt="" className="slot-background-image"/>
      <div className="dashboard-overlay dashboard-container slot-form-overlay">
        <div className="slot-details-page">
        <div className="slot-details">
          <h2>Slot Booking</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contact Number:</label>
              <input
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Query Type:</label>
              <select
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
            <div className="form-group">
              <label>Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()} // Set minimum date to current date
                required
              />
            </div>
            <div className="form-group">
              <label>Select Slot:</label>
              <select
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
            <button type="submit">Book Slot</button>
          </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default SlotBooking;
