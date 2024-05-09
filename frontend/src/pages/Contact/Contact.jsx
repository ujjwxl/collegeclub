import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Contact.css'

const Contact = () => {
    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className='home1-img' />
            <div className='contact-us-overlay dashboard-container'>
                <div className="contact-us-page-contents">
                    <h2>Contact Us</h2>
                    <hr />
                    <p>Have any question related to CollegeClub? Do check our FAQs section or reach us:</p>
                    <Link to={'/faqs'}><button className='form-submit-button'>FAQs</button></Link>
                    <Link to={'/feedback'}><button className='form-submit-button'>Feedback and suggestion</button></Link>
                    <hr />

                    <p>For Technical Support, Partnership, Grievances or any other enquiry call us via: (7AM to 10PM all days)</p>
                    <button className='contact-button'>Call us now</button>
                    <button className='contact-button'>WhatsApp</button>
                    <hr />

                    <p>Corporate Office:-</p>
                    <p>CIMP-BIIF Building, Mithapur Rd, Mithapur Farm Area, Mithapur, Patna, Bihar 800001 Bharat.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact
