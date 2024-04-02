import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import backgroundImage from '../../assets/home-1.jpg'
import DetailsFormComponent from '../../components/Forms/DetailsFormComponent'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import './CollegeDetails.css'

const CollegeDetails = () => {

    const { collegeId } = useParams();
    const [collegeData, setCollegeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/auth/user/${collegeId}`);
            setCollegeData(response.data);
          } catch (error) {
            console.error('Error fetching college data:', error.message);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div>
            <>
                <Navbar />
                {/* <img src={backgroundImage} alt="" className='home1-img' /> */}
                <img src={backgroundImage} alt="" className='details-form-background-image' />
                <div className='dashboard-overlay dashboard-container details-form-overlay'>
                    <div className="college-details-page">
                        <h1>{collegeData && collegeData.organizationName}</h1>
                        <h1>{collegeData && collegeData.universityShortName}</h1>
                    </div>
                </div>
                <Footer />
            </>
        </div>
    )
}

export default CollegeDetails
