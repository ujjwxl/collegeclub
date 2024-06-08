import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../assets/home-1.jpg";
import location from "../../assets/location.png";
import bookmark from "../../assets/bookmark.png";
import pin from "../../assets/pin.png";
import star from "../../assets/star.png";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import BottomBar from "../../components/BottomBar/BottomBar";
// import "./CollegeDetails.css";

const CompanyDetails = () => {

    const { companyId } = useParams();
    const [companyData, setCompanyData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/auth/user/${companyId}`
                );
                setCompanyData(response.data);
            } catch (error) {
                console.error("Error fetching college data:", error.message);
            }
        };

        fetchData();
    }, [companyId]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            <Navbar />
            <BottomBar />
            <img
                src={backgroundImage}
                alt=""
                className="details-form-background-image"
            />
            <div className="dashboard-overlay dashboard-container details-form-overlay">
                <div className="college-details-page">
                    <div className="college-details-page-header">
                        <div className="college-details-page-header-logo">
                            <img
                                src={companyData && companyData.profilePicture}
                                alt=""
                                className="college-logo"
                            />
                        </div>

                        <div className="college-details-page-header-details">
                            <div className="college-name">
                                <h2>{companyData && companyData.organizationName}</h2>
                            </div>
                            <div className="college-details">
                                <img src={location}></img>
                                <h4>
                                    {companyData && companyData.district},{" "}
                                    {companyData && companyData.state}
                                </h4>
                                <img src={pin}></img>
                                <h4>Estd {companyData && companyData.foundedYear}</h4>
                                <img src={star}></img>
                                <h4>{companyData && companyData.industryType}</h4>
                            </div>
                        </div>
                    </div>

                    <div id="about-college">
                        <h3>About Company</h3>
                        <h4>{companyData && companyData.aboutCompany}</h4>
                        <hr />
                    </div>

                    <div id="about-college">
                        <h3>Our Mission</h3>
                        <h4>{companyData && companyData.companyMission}</h4>
                        <hr />
                    </div>

                    <div id="college-news">
                        <h3>Services</h3>
                        {companyData && companyData.services && companyData.services.length > 0 ? (
                            <div className="table-container">
                            <table className="college-table">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companyData.services.map((service, index) => (
                                        <tr key={index}>
                                            <td>{service.serviceName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        ) : (
                            <p>No services available</p>
                        )}
                    </div>

                    <hr />

                    <div id="college-news">
                        <h3>News</h3>
                        {companyData && companyData.news && companyData.news.length > 0 ? (
                            <div className="table-container">
                                <table className="college-table">
                                    <thead>
                                        <tr>
                                            <th>Agency</th>
                                            <th>Link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companyData.news.map((news, index) => (
                                            <tr key={index}>
                                                <td>{news.newsTitle}</td>
                                                <td>
                                                    <a href={news.refLink} target="_blank">
                                                        Link
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No news available</p>
                        )}
                    </div>

                    <hr />

                    <div id="college-gallery" className="college-details-page-gallery">
                        <h3>Gallery</h3>
                        {companyData && companyData.galleryImages && companyData.galleryImages.length > 0 ? (
                            companyData.galleryImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt=""
                                    onClick={() => handleImageClick(image)}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />

            {selectedImage && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <img src={selectedImage} alt="Enlarged" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyDetails;
