import React, { useState, useEffect, cloneElement } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import location from '../../assets/location.png';
import Footer from "../../components/Home/Footer";
import backgroundImage from "../../assets/home-1.jpg";
import defaultImage from "../../assets/test-dp.jpg";
import axios from "axios";
import "./Courses.css";

const Courses = () => {

    const courses = ['Science and Technology', 'Medical', 'Business and Management', 'Fashion and Design', 'Agriculture', 'Environmental Science', 'Law and Legal', 'Hospitality', 'Journalism', 'Teaching', 'Lifestyle', 'Sports'];

    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className="home1-img" />
            <div className="courses-overlay colleges-container">
                <div className="courses-display-box">

                    <div className="courses-display-box-filter">
                        <h3>Course Type</h3>

                        {courses.map((course, index) => (
                            <div className="courses-left-items" key={index}>
                                <h3>{course}</h3>
                            </div>
                        ))}

                    </div>

                    <div className="courses-display-box-list">
                        <h2>Courses displayed here</h2>
                        <div className="course-tile">
                            <h3>BTech</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Courses;
