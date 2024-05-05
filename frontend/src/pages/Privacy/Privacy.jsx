import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Privacy.css'

const Privacy = () => {
    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className='home1-img' />
            <div className='privacy-overlay dashboard-container'>
                <div className="privacy-page-contents">
                    <h1>Privacy Policy</h1>
                    <hr />
                    <h2>Introduction</h2>
                    <p>Welcome to collegeclub.io. The website "collegeclub.io" is owned by Collegeclub Technologies Pvt. Ltd. ("CollegeClub"). This Privacy Policy explains how we collect, use, disclose, and protect your personal information. By using our Platform, you agree to the terms outlined in this policy.</p>

                    <h2>Information We Collect</h2>
                    <h3>a. User-Provided Information</h3>
                    <p><strong>Student Accounts:</strong> Information provided during account creation, such as name, email address, educational details, and academic interests.</p>
                    <p><strong>College/University Accounts:</strong> Information provided during account creation, including institution details, contact information, and authorized personnel details.</p>
                    <p><strong>Company Accounts:</strong> Information provided during account creation, such as company name, contact information, and authorized personnel details.</p>
                    <p><strong>CC-Ambassador Accounts:</strong> Information provided during account creation, including CC-Ambassador details, contact information, and authorized personnel details.</p>

                    <h3>b. Automatically Collected Information</h3>
                    <p><strong>Log Data:</strong> We collect information that your browser sends whenever you visit the Platform. This may include IP addresses, browser type, pages visited, and timestamps.</p>
                    <p><strong>Cookies:</strong> We use cookies to enhance user experience. Users can control cookie preferences through their browser settings.</p>
                    <hr />

                    <h2>How We Use Your Information</h2>
                    <p><strong>Providing Services:</strong> To facilitate communication and collaboration between students, colleges/universities, companies, and CC-Ambassador partners.</p>
                    <p><strong>Improving Services:</strong> To analyze user behavior and feedback for the enhancement of our services.</p>
                    <p><strong>Communication:</strong> To send updates, newsletters, and relevant information.</p>
                    <hr />

                    <h2>Information Sharing</h2>
                    <p><strong>With Your Consent:</strong> We may share your information with third parties if you provide explicit consent.</p>
                    <p><strong>CC-Ambassador Collaboration:</strong> CC-Ambassador partner information may be shared with other stakeholders on the Platform for collaborative opportunities.</p>
                    <hr />

                    <h2>Data Security</h2>
                    <p>We implement industry-standard security measures to protect your information. However, no method of transmission or storage is entirely secure, and we cannot guarantee absolute security.</p>
                    <hr />

                    <h2>Your Choices</h2>
                    <p>You can control the information you provide and update your preferences. You may also opt-out of promotional communications.</p>
                    <hr />

                    <h2>Accessing and Updating Your Information</h2>
                    <p>You can access and update your account information through the Platform. For additional assistance, contact <a href="mailto:support@collegeclub.io">support@collegeclub.io</a>.</p>
                    <hr />

                    <h2>Children's Privacy</h2>
                    <p>CollegeClub is not intended for individuals under the age of 13. We do not knowingly collect personal information from children.</p>
                    <hr />

                    <h2>Changes to this Privacy Policy</h2>
                    <p>We reserve the right to update this Privacy Policy. We will notify users of any material changes through the Platform or other means.</p>
                    <hr />
                    
                    <h2>Contact Us</h2>
                    <p>If you have questions or concerns about this Privacy Policy, contact us at <a href="mailto:support@collegeclub.io">support@collegeclub.io</a>.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Privacy
