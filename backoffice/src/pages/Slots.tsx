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
      const sortedData = data.sort((a, b) => {
        const dateComparison = a.selectedDate.localeCompare(b.selectedDate);
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return a.selectedSlot.localeCompare(b.selectedSlot);
      });
      setSlotBookingData(sortedData);
    } catch (error) {
      console.error('Error fetching slot booking details:', (error as Error).message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-screen p-6">
          <h2 className='font-bold text-3xl'>Slot Booking Details</h2>
          {slotBookingData && slotBookingData.length > 0 ? (
            <div className="m-4 mt-8">
              <table className="min-w-full divide-y divide-gray-200 college-table">
                <thead className="bg-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      S.No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Contact Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Query Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Selected Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Selected Slot
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200">
                  {slotBookingData.map((booking, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.contactNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.queryType}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.selectedDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.selectedSlot}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No bookings available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Slots;
