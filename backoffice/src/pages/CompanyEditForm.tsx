import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const CompanyEditForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [foundedYear, setFoundedYear] = useState('');
    const [headquarter, setHeadquarter] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [alternateContact, setAlternateContact] = useState('');
    const [alternateNumber, setAlternateNumber] = useState('');
    const [referralCode, setReferralCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', {
            companyName,
            foundedYear,
            headquarter,
            contactNumber,
            email,
            website,
            fullAddress,
            pinCode,
            country,
            state,
            district,
            alternateContact,
            alternateNumber,
            referralCode
        });
        // Add logic to handle form submission (e.g., API call, state update)
    };

    return (
        <>
            <Navbar />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-5/6 p-6">
                    <h2 className="text-2xl font-bold mb-2">Edit Company Details</h2>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="mb-2">
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name*</label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        placeholder="Company Name*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700">Founded year*</label>
                                    <input
                                        type="text"
                                        id="foundedYear"
                                        value={foundedYear}
                                        onChange={(e) => setFoundedYear(e.target.value)}
                                        required
                                        placeholder="Founded year*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="headquarter" className="block text-sm font-medium text-gray-700">Headquarter*</label>
                                    <input
                                        type="text"
                                        id="headquarter"
                                        value={headquarter}
                                        onChange={(e) => setHeadquarter(e.target.value)}
                                        required
                                        placeholder="Headquarter*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact No.*</label>
                                    <input
                                        type="text"
                                        id="contactNumber"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        required
                                        placeholder="Contact No.*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Email*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website*</label>
                                    <input
                                        type="url"
                                        id="website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        required
                                        placeholder="Website*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>


                            </div>
                            <div className="mb-2">
                                <h3 className="text-lg font-medium mt-6 mb-3">Address</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-2">
                                        <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">Full Address*</label>
                                        <input
                                            type="text"
                                            id="fullAddress"
                                            value={fullAddress}
                                            onChange={(e) => setFullAddress(e.target.value)}
                                            required
                                            placeholder="Full Address*"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">PIN Code*</label>
                                        <input
                                            type="text"
                                            id="pinCode"
                                            value={pinCode}
                                            onChange={(e) => setPinCode(e.target.value)}
                                            required
                                            placeholder="PIN Code*"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country*</label>
                                        <input
                                            type="text"
                                            id="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            placeholder="Country*"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State*</label>
                                        <input
                                            type="text"
                                            id="state"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                            placeholder="State*"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="district" className="block text-sm font-medium text-gray-700">District*</label>
                                        <input
                                            type="text"
                                            id="district"
                                            value={district}
                                            onChange={(e) => setDistrict(e.target.value)}
                                            required
                                            placeholder="District*"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <h3 className="text-lg font-medium mt-6 mb-3">Alt. Contact Info</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-2">
                                        <label htmlFor="alternateContact" className="block text-sm font-medium text-gray-700">Alt. Contact Person Name*</label>
                                        <input
                                            type="text"
                                            id="alternateContact"
                                            value={alternateContact}
                                            onChange={(e) => setAlternateContact(e.target.value)}
                                            required
                                            placeholder="Alt. Contact Person Name*"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="alternateNumber" className="block text-sm font-medium text-gray-700">Alternate Contact No.*</label>
                                        <input
                                            type="text"
                                            id="alternateNumber"
                                            value={alternateNumber}
                                            onChange={(e) => setAlternateNumber(e.target.value)}
                                            required
                                            placeholder="Alternate Contact No.*"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <h3 className="text-lg font-medium mt-6 mb-3">Do you have a referral code?</h3>
                                <input
                                    type="text"
                                    id="referralCode"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value)}
                                    placeholder="Enter the referral code"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <h2 className="text-lg font-medium mt-6 mb-3">Business Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="mb-2">
                                    
                                    <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">About company*</label>
                                    <textarea
                                        // onChange={(e) => setAboutCompany(e.target.value)}
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="10"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">Why join us?*    (Mission and Vision)</label>
                                    <textarea
                                        // onChange={(e) => setCompanyMission(e.target.value)}
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="10"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyEditForm;
