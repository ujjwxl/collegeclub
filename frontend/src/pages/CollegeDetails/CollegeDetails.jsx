import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../assets/home-1.jpg";
import location from "../../assets/location.png";
import bookmark from "../../assets/bookmark.png";
import pin from "../../assets/pin.png";
import star from "../../assets/star.png";
import DetailsFormComponent from "../../components/Forms/DetailsFormComponent";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import Hostel from "../../assets/hostel.png";
import Security from "../../assets/security.png";
import Cafeteria from "../../assets/cafeteria.png";
import Library from "../../assets/library.png";
import Transport from "../../assets/transport.png"
import Banking from "../../assets/banking.png"
import Gymnasium from "../../assets/gymnasium.png"
import wifi from "../../assets/wi-fi.png"
import Medical from "../../assets/medical.png";
import "./CollegeDetails.css";

const CollegeDetails = () => {
  const { collegeId } = useParams();
  const [collegeData, setCollegeData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/auth/user/${collegeId}`
        );
        setCollegeData(response.data);
      } catch (error) {
        console.error("Error fetching college data:", error.message);
      }
    };

    fetchData();
  }, [collegeId]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const facilityImages = {
    Hostel: Hostel,
    Security: Security,
    Cafeteria: Cafeteria,
    Library: Library,
    Transport: Transport,
    Banking: Banking,
    Gymnasium: Gymnasium,
    WiFi: wifi,
    Medical: Medical,
    // Add more facilities and their corresponding image URLs as needed
  };

  return (
    <div>
      <Navbar />
      <img
        src={backgroundImage}
        alt=""
        className="details-form-background-image"
      />
      <div className="dashboard-overlay dashboard-container details-form-overlay">
        <div className="college-details-page">
          <div className="college-details-page-header">
            <img
              src={collegeData && collegeData.profilePicture}
              alt=""
              className="college-logo"
            />
            <div className="college-details-page-header-details">
              <div className="college-name">
                <h2>{collegeData && collegeData.organizationName}</h2>
                <h2>({collegeData && collegeData.instituteType} University)</h2>
              </div>
              <div className="college-details">
                <img src={location}></img>
                <h4>
                  {collegeData && collegeData.district},{" "}
                  {collegeData && collegeData.state}
                </h4>
                <img src={bookmark}></img>
                <h4>{collegeData && collegeData.approvedBy}</h4>
                <img src={pin}></img>
                <h4>Estd {collegeData && collegeData.foundedYear}</h4>
                <img src={star}></img>
                <h4>{collegeData && collegeData.instituteType}</h4>
              </div>
            </div>
          </div>

          <div className="college-page-navigation-bar">
            <div className="college-page-navigation-bar-content">
              <a href="#about-college">About</a>
              <a href="#admission-process">Admission</a>
              <a href="#college-courses">Courses</a>
              <a href="#college-departments">Departments</a>
              <a href="#college-ranking">Ranking</a>
              <a href="#college-news">News</a>
              <a href="#college-gallery">Gallery</a>
            </div>
          </div>

          <div id="about-college">
            <h3>About College</h3>
            <h4>{collegeData && collegeData.aboutCollege}</h4>
            <hr />
          </div>

          <h3>Courses Offered</h3>
          {collegeData &&
            collegeData.selectedCourses.map((course, index) => (
              <div key={index}>
                <li>{course}</li>
              </div>
            ))}
          <hr />

          <div id="admission-process">
            <div className="admission-process">
              <h3>Admission Process</h3>
              <h4>{collegeData && collegeData.admissionProcess}</h4>
              <hr />
            </div>
          </div>

          {/* <h3>Courses</h3>
          {collegeData &&
            collegeData.courses.map((course, index) => (
              <div key={index}>
                <h4>{course.courseName}</h4>
                <h5>Duration: {course.duration} years</h5>
                <h5>Minimum Qualification: {course.minQualification}</h5>
                <h5>Fee: {course.fee}</h5>
                <h5>Distance: {course.distance}</h5>
              </div>
            ))} */}

          <div id="college-courses">
            <h3>Courses</h3>
            {collegeData && collegeData.courses.length > 0 ? (
              <div className="table-container">
                <table className="college-table">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Duration</th>
                      <th>Minimum Qualification</th>
                      <th>Fee</th>
                      <th>Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeData.courses.map((course, index) => (
                      <tr key={index}>
                        <td>{course.courseName}</td>
                        <td>{course.duration} years</td>
                        <td>{course.minQualification}</td>
                        <td>{course.fee}</td>
                        <td>{course.distance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No courses available</p>
            )}
          </div>

          <hr />

          {/* <h3>Departments</h3>
          {collegeData &&
            collegeData.departments.map((department, index) => (
              <div key={index}>
                <h4>{department.departmentName}</h4>
                <h5>{department.description}</h5>
                <h5>Placement Percentage: {department.placementPercentage}</h5>
              </div>
            ))} */}

          <div id="college-departments">
            <h3>Departments</h3>
            {collegeData && collegeData.departments.length > 0 ? (
              <div className="table-container">
                <table className="college-table">
                  <thead>
                    <tr>
                      <th>Department Name</th>
                      <th>Description</th>
                      <th>Placement Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeData.departments.map((department, index) => (
                      <tr key={index}>
                        <td>{department.departmentName}</td>
                        <td>{department.description}</td>
                        <td>{department.placementPercentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No departments available</p>
            )}
          </div>

          <hr />

          {/* <h3>Rankings</h3> */}
          {/* {collegeData &&
            collegeData.rankings.map((ranking, index) => (
              <div key={index}>
                <h4>Agency: {ranking.agencyName}</h4>
                <h5>Rank: {ranking.rank}</h5>
                <h5>Year: {ranking.year}</h5>
              </div>
            ))} */}

          <div id="college-ranking">
            <h3>Rankings</h3>
            {collegeData && collegeData.rankings.length > 0 ? (
              <div className="table-container">
                <table className="college-table">
                  <thead>
                    <tr>
                      <th>Agency</th>
                      <th>Rank</th>
                      <th>Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeData.rankings.map((ranking, index) => (
                      <tr key={index}>
                        <td>{ranking.agencyName}</td>
                        <td>{ranking.rank}</td>
                        <td>{ranking.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No rankings available</p>
            )}
          </div>

          <hr />

          <h3>
            Scholarship Provided: {collegeData && collegeData.scholarship}
          </h3>
          <hr />

          {/* <h3>News</h3>
          {collegeData &&
            collegeData.news.map((news, index) => (
              <div key={index}>
                <h4>Agency: {news.newsTitle}</h4>
                <a href={news.refLink} target="_blank">
                  Link
                </a>
              </div>
            ))} */}

          <div id="college-news">
            <h3>News</h3>
            {collegeData && collegeData.news.length > 0 ? (
              <div className="table-container">
                <table className="college-table">
                  <thead>
                    <tr>
                      <th>Agency</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeData.news.map((news, index) => (
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

          <div id="facilities">
            <h3>Facilities</h3>
            <div className="facilities-flex-container">
              {collegeData && collegeData.selectedFacilities.length > 0 ? (
                collegeData.selectedFacilities.map((facility, index) => (
                  <div key={index} className="facility-item">
                    {facilityImages[facility] && (
                      <img src={facilityImages[facility]} alt={facility} />
                    )}
                    <span>{facility}</span>
                  </div>
                ))
              ) : (
                <p>No facilities available</p>
              )}
            </div>
          </div>
          <hr />

          <div id="college-gallery" className="college-details-page-gallery">
            <h3>Gallery</h3>
            {collegeData &&
              collegeData.galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  onClick={() => handleImageClick(image)}
                />
              ))}
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

export default CollegeDetails;
