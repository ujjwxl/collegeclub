import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

interface SlotBooking {
  name: string;
  contactNumber: string;
  queryType: string;
  selectedDate: string;
  selectedSlot: string;
}

const Slots: React.FC = () => {
  const [slotBookingData, setSlotBookingData] = useState<SlotBooking[]>([]);

  useEffect(() => {
    fetchSlotBookingDetails();
  }, []);

  const fetchSlotBookingDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/slotbookings');
      if (!response.ok) {
        throw new Error('Failed to fetch slot booking details');
      }
      const data: SlotBooking[] = await response.json();
      setSlotBookingData(data);
    } catch (error) {
        console.error('Error fetching slot booking details:', (error as Error).message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen ">
      <Sidebar />
      <div className="slot-list-container">
        <h2 className='font-bold text-xl'>Slot Booking Details</h2>
        <ul>
          {slotBookingData.map((booking, index) => (
            <li key={index}>
              <strong>Name:</strong> {booking.name}<br />
              <strong>Contact Number:</strong> {booking.contactNumber}<br />
              <strong>Query Type:</strong> {booking.queryType}<br />
              <strong>Selected Date:</strong> {booking.selectedDate}<br />
              <strong>Selected Slot:</strong> {booking.selectedSlot}<br />
              <br />
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
};

export default Slots;
