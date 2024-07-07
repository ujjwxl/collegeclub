import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import { Company } from "../types/Company.tsx";
import axios, { AxiosError, AxiosResponse } from 'axios';

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
    const [aboutCompany, setAboutCompany] = useState('');
    const [companyMission, setCompanyMission] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [promo, setPromo] = useState('');
    const [industryType, setIndustryType] = useState('');
    const [services, setServices] = useState([{ serviceName: '' }]);
    const [news, setNews] = useState([{ newsTitle: '', refLink: '' }]);
    const [companyData, setCompanyData] = useState<Company>();


    const { companyId } = useParams<{ companyId: string }>();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/auth/user/${companyId}`)
            .then((response: AxiosResponse) => {
                setCompanyData(response.data);
                if (response.data) {
                    setCompanyName(response.data.organizationName || '');
                    setFoundedYear(response.data.foundedYear || '');
                    setHeadquarter(response.data.headquarter || '');
                    setContactNumber(response.data.contactNumber || '');
                    setEmail(response.data.email || '');
                    setWebsite(response.data.website || '');
                    setFullAddress(response.data.fullAddress || '');
                    setPinCode(response.data.pinCode || '');
                    setCountry(response.data.country || '');
                    setState(response.data.state || '');
                    setDistrict(response.data.district || '');
                    setAlternateContact(response.data.alternateContact || '');
                    setAlternateNumber(response.data.alternateNumber || '');
                    setReferralCode(response.data.referralCode || '');
                    setAboutCompany(response.data.aboutCompany || '');
                    setCompanyMission(response.data.companyMission || '');
                    setRegistrationNumber(response.data.registrationNumber || '');
                    setPromo(response.data.promo || '');
                    setIndustryType(response.data.industryType || '');
                    setServices(response.data.services || [{ serviceName: '' }]);
                    setNews(response.data.news || [{ newsTitle: '', refLink: '' }]);
                }
            })
            .catch((error: AxiosError) => {
                alert("Could not get company details!");
                console.log(error);
            });
    }, [companyId]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
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
            referralCode,
            aboutCompany,
            companyMission,
            registrationNumber,
            promo,
            industryType,
            services,
            news
        };

        try {
            const response = await axios.post(`http://localhost:5000/admin/updatecompany/${companyId}`, formData);
            console.log("Form data successfully submitted:", response.data);
            alert("Update Successfull");
            // Add logic for any success handling (e.g., show success message)
        } catch (error) {
            console.error("Error submitting form data:", error);
            // Add logic for error handling (e.g., show error message)
        }
    };

    const industries = [
        "Technology",
        "Healthcare",
        "Finance",
        "Education",
        "Manufacturing",
        "Retail",
        "Hospitality",
        "Automotive",
        "Construction",
        "Real Estate",
        "Media and Entertainment",
        "Telecommunications",
        "Non-profit",
        "Government",
        "Agriculture",
        "Energy",
        "Transportation",
        "Consulting",
        "Others"
    ];

    const handleServiceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedServices = [...services];
        updatedServices[index][name] = value;
        setServices(updatedServices);
    };

    const handleNewsChange = (index, e) => {
        const { name, value } = e.target;
        const updatedNews = [...news];
        updatedNews[index][name] = value;
        setNews(updatedNews);
    };

    const addService = () => {
        setServices([...services, { serviceName: '' }]);
    };

    const removeService = (index) => {
        const updatedServices = [...services];
        updatedServices.splice(index, 1);
        setServices(updatedServices);
    };

    const addNews = () => {
        setNews([...news, { newsTitle: '', refLink: '' }]);
    };

    const removeNews = (index) => {
        const updatedNews = [...news];
        updatedNews.splice(index, 1);
        setNews(updatedNews);
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
                            {/* Company Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="mb-4">
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
                                <div className="mb-4">
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
                                <div className="mb-4">
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
                                <div className="mb-4">
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
                                <div className="mb-4">
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
                                <div className="mb-4">
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website*</label>
                                    <input
                                        type="text"
                                        id="website"
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        required
                                        placeholder="Website*"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mt-6 mb-3">Address</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-4">
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
                                    <div className="mb-4">
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
                                    <div className="mb-4">
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
                                    <div className="mb-4">
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
                                    <div className="mb-4">
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

                            {/* Additional Contact Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="mb-4">
                                    <label htmlFor="alternateContact" className="block text-sm font-medium text-gray-700">Alternate Contact</label>
                                    <input
                                        type="text"
                                        id="alternateContact"
                                        value={alternateContact}
                                        onChange={(e) => setAlternateContact(e.target.value)}
                                        placeholder="Alternate Contact"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="alternateNumber" className="block text-sm font-medium text-gray-700">Alternate Number</label>
                                    <input
                                        type="text"
                                        id="alternateNumber"
                                        value={alternateNumber}
                                        onChange={(e) => setAlternateNumber(e.target.value)}
                                        placeholder="Alternate Number"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Referral Code Section */}
                            <div className="mb-4">
                                <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">Referral Code</label>
                                <input
                                    type="text"
                                    id="referralCode"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value)}
                                    placeholder="Referral Code"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* About Company Section */}
                            <div className="mb-4">
                                <label htmlFor="aboutCompany" className="block text-sm font-medium text-gray-700">About Company</label>
                                <textarea
                                    id="aboutCompany"
                                    value={aboutCompany}
                                    onChange={(e) => setAboutCompany(e.target.value)}
                                    placeholder="About Company"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    rows="4"
                                ></textarea>
                            </div>

                            {/* Company Mission Section */}
                            <div className="mb-4">
                                <label htmlFor="companyMission" className="block text-sm font-medium text-gray-700">Company Mission</label>
                                <textarea
                                    id="companyMission"
                                    value={companyMission}
                                    onChange={(e) => setCompanyMission(e.target.value)}
                                    placeholder="Company Mission"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    rows="4"
                                ></textarea>
                            </div>

                            {/* Registration Number Section */}
                            <div className="mb-4">
                                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">Registration Number</label>
                                <input
                                    type="text"
                                    id="registrationNumber"
                                    value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                    placeholder="Registration Number"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Promo Section */}
                            <div className="mb-4">
                                <label htmlFor="promo" className="block text-sm font-medium text-gray-700">Promo</label>
                                <input
                                    type="text"
                                    id="promo"
                                    value={promo}
                                    onChange={(e) => setPromo(e.target.value)}
                                    placeholder="Promo"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Industry Type Section */}
                            <div className="mb-4">
                                <label htmlFor="industry">Industry/Field*</label>
                                <select value={industryType} onChange={(e) => setIndustryType(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="">Select industry/field*</option>
                                    {industries.map((field) => (
                                        <option key={field} value={field}>{field}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Services Section */}
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mt-6 mb-3">Services</h3>
                                {services.map((service, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                                        <input
                                            type="text"
                                            name="serviceName"
                                            value={service.serviceName}
                                            onChange={(e) => handleServiceChange(index, e)}
                                            placeholder="Service Name"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeService(index)}
                                            className="inline-flex items-center justify-center w-1/3 px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addService}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add Service
                                </button>
                            </div>

                            {/* News Section */}
                            <div className="mb-4">
                                <h3 className="text-lg font-medium mt-6 mb-3">News</h3>
                                {news.map((item, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                                        <input
                                            type="text"
                                            name="newsTitle"
                                            value={item.newsTitle}
                                            onChange={(e) => handleNewsChange(index, e)}
                                            placeholder="News Title"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                            type="text"
                                            name="refLink"
                                            value={item.refLink}
                                            onChange={(e) => handleNewsChange(index, e)}
                                            placeholder="Reference Link"
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNews(index)}
                                            className="inline-flex items-center justify-center w-1/3 px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addNews}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add News
                                </button>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyEditForm;
