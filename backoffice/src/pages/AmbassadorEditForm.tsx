import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Ambassador } from "../types/Ambassador";


const AmbassadorEditForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [dob, setDob] = useState<Date | null>(null);
  const [contactNumber, setContactNumber] = useState<string>('');
  const [linkedin, setLinkedIn] = useState<any>('');
  const [email, setEmail] = useState<string>('');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [collegeName, setCollegeName] = useState<string>('');
  const [collegePincode, setCollegePincode] = useState<string>('');
  const [collegeCountry, setCollegeCountry] = useState<string>('');
  const [collegeState, setCollegeState] = useState<string>('');
  const [collegeDistrict, setCollegeDistrict] = useState<string>('');
  const [whyJoinUs, setWhyJoinUs] = useState<any>('');
  const [ambassadorData, setAmbassadorData] = useState<Ambassador>();

  console.log(ambassadorData);

  const { ambassadorId } = useParams<{ ambassadorId: string }>();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/user/${ambassadorId}`)
      .then((response: AxiosResponse<Ambassador>) => {
        const data = response.data;
        setAmbassadorData(data);

        setName(data.organizationName);
        setGender(data.gender);
        setDob(new Date(data.dob)); 
        setContactNumber(data.contactNumber);
        setLinkedIn(data.linkedin);
        setEmail(data.email);
        setFullAddress(data.fullAddress);
        setPinCode(data.pinCode);
        setCountry(data.country);
        setState(data.state);
        setDistrict(data.district);
        setCollegeName(data.collegeName);
        setCollegePincode(data.collegePincode);
        setCollegeCountry(data.collegeCountry);
        setCollegeState(data.collegeState);
        setCollegeDistrict(data.collegeDistrict);
        setWhyJoinUs(data.whyJoinUs);
      })
      .catch((error: AxiosError) => {
        alert("Could not get ambassador details!");
        console.log(error);
      });
  }, [ambassadorId]);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/admin/updateAmbassador/${ambassadorId}`, {
        name,
        gender,
        dob,
        contactNumber,
        linkedin,
        email,
        fullAddress,
        pinCode,
        country,
        state,
        district,
        collegeName,
        collegePincode,
        collegeCountry,
        collegeState,
        collegeDistrict,
        whyJoinUs,
      });

      if (response.status === 200) {
        alert("Ambassador profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="w-5/6 p-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-8">Profile Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="">Select gender</option>
                    {['Male', 'Female', 'Others'].map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <ReactDatePicker
                    id="dob"
                    selected={dob}
                    onChange={(date) => setDob(date as Date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date of Birth"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                    showYearDropdown
                    scrollableYearDropdown
                    maxDate={new Date()}
                    yearDropdownItemNumber={60}
                  />
                </div>
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                    Contact No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactNumber"
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter the contact number"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn Profile <span className="text-red-500">*</span>
                </label>
                <input
                  id="linkedin"
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter the LinkedIn Profile"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter the email"
                  required
                />
              </div>

              <div>
                <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">
                  Complete Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullAddress"
                  type="text"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter the complete address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pinCode"
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter pin code"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter country"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter state"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="district"
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter district"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="collegeName"
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter the college name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="collegePincode" className="block text-sm font-medium text-gray-700">
                    College PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="collegePincode"
                    type="text"
                    value={collegePincode}
                    onChange={(e) => setCollegePincode(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter the pincode"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="collegeCountry" className="block text-sm font-medium text-gray-700">
                    College Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="collegeCountry"
                    type="text"
                    value={collegeCountry}
                    onChange={(e) => setCollegeCountry(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter country"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="collegeState" className="block text-sm font-medium text-gray-700">
                    College State <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="collegeState"
                    type="text"
                    value={collegeState}
                    onChange={(e) => setCollegeState(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter state"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="collegeDistrict" className="block text-sm font-medium text-gray-700">
                    College District <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="collegeDistrict"
                    type="text"
                    value={collegeDistrict}
                    onChange={(e) => setCollegeDistrict(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter district"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="whyJoinUs" className="block text-sm font-medium text-gray-700">
                    Why join us? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="whyJoinUs"
                    value={whyJoinUs}
                    onChange={(e) => setWhyJoinUs(e.target.value)}
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Tell us why you want to join us"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save and Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmbassadorEditForm;
