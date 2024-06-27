import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const HR = () => {
    const [selectedTab, setSelectedTab] = useState('teams');
    const [selectedDropdownOption, setSelectedDropdownOption] = useState('all');
    const [name, setName] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [position, setPosition] = useState('');
    const [joiningYear, setJoiningYear] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                name,
                dob,
                gender,
                bloodGroup,
                position,
                joiningYear,
                mobileNo,
                address,
                photo: selectedImage, // Assuming selectedImage is already a File object or blob
            };

            const response = await axios.post('http://localhost:5000/admin/team/add', formData);

            // Handle success (you can reset form state or navigate away)
            console.log('Form submitted successfully');
            setName('');
            setDOB('');
            setGender('');
            setBloodGroup('');
            setPosition('');
            setJoiningYear('');
            setMobileNo('');
            setAddress('');
            setSelectedImage(null);
            // setFormError(null); 
        } catch (error) {
            console.error('Error submitting form:', error);
            // setFormError('Failed to submit form. Please try again.');
        }
    };


    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6 p-4">
                    <div className="flex justify-around mb-8">
                        <div
                            className={`w-1/3 bg-slate-500 mt-4 p-4 text-center rounded-xl cursor-pointer transition-colors duration-300 ${selectedTab === 'teams' ? 'bg-blue-500 text-white' : 'bg-slate-500 text-gray-200 hover:bg-gray-700'}`}
                            onClick={() => setSelectedTab('teams')}
                        >
                            <p className="text-xl">Teams</p>
                        </div>

                        <div
                            className={`w-1/3 bg-slate-500 mt-4 p-4 text-center rounded-xl cursor-pointer transition-colors duration-300 ${selectedTab === 'openings' ? 'bg-blue-500 text-white' : 'bg-slate-500 text-gray-200 hover:bg-gray-700'}`}
                            onClick={() => setSelectedTab('openings')}
                        >
                            <p className="text-xl">Openings</p>
                        </div>
                    </div>

                    <div>
                        {selectedTab === 'teams' && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="dropdown" className="block text-gray-700 text-sm font-bold mb-2">
                                        Select Option:
                                    </label>
                                    <select
                                        id="dropdown"
                                        value={selectedDropdownOption}
                                        onChange={(e) => setSelectedDropdownOption(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="all">All Teams</option>
                                        <option value="add">Add Team</option>
                                    </select>
                                </div>

                                {selectedDropdownOption === 'all' && (
                                    <h1 className="text-3xl font-semibold text-gray-800">All Teams Content Here</h1>
                                )}
                                {selectedDropdownOption === 'add' && (
                                    <form className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <h2 className="text-2xl font-bold mb-4">Add Team Member</h2>
                                        </div>

                                        {/* Name and Date of Birth */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Enter the full name"
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Date of Birth*
                                                </label>
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    onChange={(e) => setDOB(e.target.value)}
                                                    value={dob}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Gender and Blood Group */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Gender*
                                                </label>
                                                <select
                                                    id="gender"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="">Select Gender*</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="others">Others</option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="bloodGroup" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Blood Group*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="bloodGroup"
                                                    placeholder="Enter blood group"
                                                    onChange={(e) => setBloodGroup(e.target.value)}
                                                    value={bloodGroup}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Position and Joining Year */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Position*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="position"
                                                    placeholder="Enter position"
                                                    onChange={(e) => setPosition(e.target.value)}
                                                    value={position}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="joiningYear" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Joining Year*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="joiningYear"
                                                    placeholder="Enter joining year"
                                                    onChange={(e) => setJoiningYear(e.target.value)}
                                                    value={joiningYear}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Mobile No. and Address */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="mb-4">
                                                <label htmlFor="mobileNo" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Mobile No.*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="mobileNo"
                                                    placeholder="Enter mobile number"
                                                    onChange={(e) => setMobileNo(e.target.value)}
                                                    value={mobileNo}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                                                    Address*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    placeholder="Enter address"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    value={address}
                                                    required
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                            </div>
                                        </div>

                                        {/* Upload Photo */}
                                        <div className="mb-4">
                                            <label htmlFor="uploadPhoto" className="block text-gray-700 text-sm font-bold mb-2">
                                                Upload Photo*
                                            </label>
                                            <input
                                                type="file"
                                                id="uploadPhoto"
                                                accept="image/*"
                                                // onChange={(e) => setSelectedImage(e.target.files[0])}
                                                required
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mb-6">
                                            <button
                                                type="submit"
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                        {selectedTab === 'openings' && (
                            <h1 className="text-3xl font-semibold text-gray-800">Openings Content Here</h1>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HR;
