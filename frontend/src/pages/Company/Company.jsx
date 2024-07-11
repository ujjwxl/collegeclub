import React, { useState, useEffect, cloneElement } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Navigation from "../../components/Navigation/Navigation";
import location from "../../assets/location.png";
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import defaultImage from "../../assets/test-dp.jpg";
import { Link } from "react-router-dom";
import BottomBar from "../../components/BottomBar/BottomBar";
import Accordion from "../College/Accordion";
import axios from "axios";
import "./Company.css";

const Company = () => {
    const [companyData, setCompanyData] = useState([]);

    const [locationFilter, setLocationFilter] = useState("");
    const [industryFilter, setIndustryFilter] = useState("");

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);

    const navigate = useNavigate();

    const clearFilters = () => {
        setLocationFilter("");
        setIndustryFilter("");
    };

    const states = [
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra and Nagar Haveli and Daman & Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu & Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
    ];

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/company");
                setCompanyData(response.data);
            } catch (error) {
                console.error("Error fetching college data:", error.message);
            }
        };

        fetchData();
    }, []);

    const filteredCompanies = companyData.filter((company) => {
        const locationTypeMatch =
            !locationFilter ||
            company.state.toLowerCase() === locationFilter.toLowerCase();
        const industryMatch =
            !industryFilter ||
            company.industry.toLowerCase() === industryFilter.toLowerCase();
        return locationTypeMatch && industryMatch;
    });

    const toggleFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const renderFilterOptions = (filter) => {
        switch (filter) {
            case "Location":
                return states.map((state) => (
                    <label key={state}>
                        <input
                            type="checkbox"
                            checked={locationFilter === state}
                            onChange={() => setLocationFilter(state)}
                        />{" "}
                        {state} <br />
                    </label>
                ));
            case "Industry":
                return industries.map((industry) => (
                    <label key={industry}>
                        <input
                            type="checkbox"
                            checked={industryFilter === industry}
                            onChange={() => setIndustryFilter(industry)}
                        />{" "}
                        {industry} <br />
                    </label>
                ));
            default:
                return null;
        }
    };

    const accordionData = [
        {
            title: "Location",
            content: renderFilterOptions("Location"),
        },
        {
            title: "Industry",
            content: renderFilterOptions("Industry"),
        }
    ];

    console.log(accordionData)

    const handleAccordionToggle = (accordionIndex) => {
        setActiveAccordion(
            activeAccordion === accordionIndex ? null : accordionIndex
        );
    };

    const handleClickOutsideModal = (e) => {
        if (
            isFilterModalOpen &&
            !e.target.closest(".filter-modal") &&
            !e.target.closest(".courses-filter-btn")
        ) {
            setIsFilterModalOpen(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener("click", handleClickOutsideModal);

        return () => {
            document.body.removeEventListener("click", handleClickOutsideModal);
        };
    }, [isFilterModalOpen]);

    const openCompanyDetails = (companyId, e) => {
        if (e.target.tagName === "BUTTON") {
          e.preventDefault();
          e.stopPropagation();
          navigate("/slot");
        } else {
          console.log(companyId)
          navigate(`/company/${companyId}`);
        }
      };


    return (
        <>
            <Navbar />
            <BottomBar />
            <img src={backgroundImage} alt="" className="home1-img" />
            <div className={`openings-overlay colleges-container ${isFilterModalOpen ? "blur-background" : ""}`}>

                <div className="courses-title">
                    <h2>Companies</h2>
                    <button className="courses-filter-btn" onClick={toggleFilterModal}>
                        FILTERS
                    </button>
                </div>
                {isFilterModalOpen && (
                    <motion.div className={`filter-modal ${isFilterModalOpen ? "show" : ""}`} initial={{ x: "10%" }}
                        animate={{ x: isFilterModalOpen ? 0 : "100%" }}
                        exit={{ x: "100%" }}>
                        <div className="filter-modal-header">
                            <h3 onClick={clearFilters}>Clear</h3>
                            <button
                                className="colleges-filter-modal-btn"
                                onClick={toggleFilterModal}
                            >
                                APPLY
                            </button>
                        </div>
                        <div className="filter-modal-content">
                            <div className="accord">
                                {accordionData.map(({ title, content }, index) => (
                                    <Accordion
                                        key={index}
                                        title={title}
                                        content={content}
                                        isActive={activeAccordion === index}
                                        onToggle={() => handleAccordionToggle(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
                <div className="openings-display-box">
                    <div className="openings-display-box-filter">
                        <h2>Filters</h2>

                        <h2>Location</h2>
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>

                        <h2>Industry</h2>
                        <select
                            value={industryFilter}
                            onChange={(e) => setIndustryFilter(e.target.value)}
                        >
                            <option value="">All</option>
                            {industries.map((industry, index) => (
                                <option key={index} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div>

                    <div className="colleges-display-box-list">
                        {/* <div className="job-list openings-job-list"> */}
                            {companyData &&
                                filteredCompanies.map(
                                    (company, index) =>
                                        company.isVerified && (
                                            <div
                                                className="colleges-display-box-item"
                                                key={index}
                                                onClick={(e) => openCompanyDetails(company.userId, e)}
                                            >
                                                <div className="college-display-box-item-image">
                                                    <img
                                                        src={
                                                            company.profilePicture
                                                                ? company.profilePicture
                                                                : defaultImage
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="colleges-display-box-item-details">
                                                    <div className="list-college-details-page">
                                                        <div className="list-college-name">
                                                            <h3>{company.organizationName}</h3>
                                                        </div>
                                                        <div className="list-college-details">
                                                            <img src={location}></img>
                                                            <h4>
                                                                {company && company.district},{" "}
                                                                {company && company.state}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="colleges-display-box-item-details-two">
                                                    <Link to="/slot">
                                                        <button className="college-button">
                                                            Enquire Now
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                )}
                        {/* </div> */}
                    </div>
                </div>
            </div>

            <Footer />
            {isFilterModalOpen && <div className="backdrop"></div>}

        </>
    );
};

export default Company;
