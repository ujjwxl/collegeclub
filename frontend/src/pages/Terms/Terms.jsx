import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Terms.css'

const Terms = () => {
    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className='home1-img' />
            <div className='terms-overlay dashboard-container'>
                <div className="terms-page-contents">
                    <h2>Terms & Conditions</h2>
                    <hr />

                    <h3>General Product Policy</h3>
                    <h3>COLLEGECLUB.IO</h3>
                    <p>January 1, 2024.</p>
                    <hr />

                    <h3>Acceptance of Terms</h3>
                    <p>By accessing or using the collegeclub.io platform ("CollegeClub"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the Platform.</p>
                    <hr />

                    <h3>User Accounts</h3>
                    <ol>
                        <li>
                            <h3>Student Accounts:</h3>
                            <p>Users must be students of a recognized college or university to create a student account. Users must provide accurate and complete information during the registration process.</p>
                        </li>
                        <li>
                            <h3>College/University Accounts:</h3>
                            <p>Institutions must be recognized educational establishments to create an account. Accounts representing colleges or universities must be created by authorized personnel.</p>
                        </li>
                        <li>
                            <h3>Company Accounts:</h3>
                            <p>Companies must be legitimate entities to create an account. Accounts representing companies must be created by authorized personnel.</p>
                        </li>
                        <li>
                            <h3>CC-Ambassador Accounts:</h3>
                            <p>CC-Ambassador partners must be authorized entities to create an account. Accounts representing CC-Ambassador partners must be created by authorized personnel.</p>
                        </li>
                    </ol>
                    <hr />

                    <h3>Content</h3>
                    <ol>
                        <li>
                            <h3>User-Generated Content:</h3>
                            <p>Users are responsible for the content they post on the Platform. Content must not violate any applicable laws or infringe on the rights of others.</p>
                        </li>
                        <li>
                            <h3>Intellectual Property:</h3>
                            <p>CollegeClub respects intellectual property rights. Users must not post or use any content that infringes on the intellectual property rights of others.</p>
                        </li>
                    </ol>
                    <hr />

                    <h3>Privacy</h3>
                    <ol>
                        <li>
                            <h3>Data Collection:</h3>
                            <p>CollegeClub may collect and process personal information in accordance with its Privacy Policy. Users consent to the collection, use, and sharing of their data as outlined in the Privacy Policy.</p>
                        </li>
                        <li>
                            <h3>CC-Ambassador Information:</h3>
                            <p>CC-Ambassador partners agree to provide accurate and up-to-date information about their CC-Ambassador operations. CollegeClub may use this information for collaboration and promotional purposes.</p>
                        </li>
                    </ol>
                    <hr />

                    <h3>CC-Ambassador Partnerships</h3>
                    <ol>
                        <li>
                            <h3>CC-Ambassador Agreement:</h3>
                            <p>CC-Ambassador partners must adhere to the terms outlined in the CC-Ambassador agreement between CollegeClub and the CC-Ambassador partner.</p>
                        </li>
                        <li>
                            <h3>Promotion:</h3>
                            <p>CC-Ambassador partners may be featured on the Platform for promotional purposes. CollegeClub reserves the right to showcase CC-Ambassador partner information on the Platform.</p>
                        </li>
                    </ol>
                    <hr />

                    <h3>Onboarding Fees</h3>
                    <ol>
                        <li>
                            <h3>One-Time Fee:</h3>
                            <p>Colleges/Universities, Companies, and CC-Ambassador Partners are required to pay a one-time onboarding fee upon creating an account on CollegeClub. This fee is non-recurring.</p>
                        </li>
                        <li>
                            <h3>Refundable Nature:</h3>
                            <ul>
                                <li><p>Within 7 Days: A full refund is available if a College/University, Company, or CC-Ambassador Partner requests an account termination within the first 7 days of onboarding.</p></li>
                                <li><p>Minimum Active Account Period: If CollegeClub terminates the account for reasons unrelated to a breach of these terms by the College/University, Company, or CC-Ambassador Partner, a pro-rata refund will be provided if the termination occurs within the first 3 years of onboarding.</p></li>
                            </ul>
                        </li>
                        <li>
                            <h3>Minimum Active Account Period:</h3>
                            <p>Colleges/Universities, Companies, and CC-Ambassador Partners agree to maintain an active account on CollegeClub for a minimum period of 3 years from the date of onboarding.</p>
                        </li>
                        <li>
                            <h3>Refund Process:</h3>
                            <p>Requests for refunds must be submitted in writing to collegeclub.io (<a href="mailto:support@collegeclub.io">support@collegeclub.io</a>) within the specified refundable periods. Refunds will be processed within a reasonable timeframe.</p>
                        </li>
                    </ol>
                    <hr />

                    <h3>Termination</h3>
                    <ol>
                        <li>
                            <h3>Voluntary Termination:</h3>
                            <p>Should a College/University, Company, or CC-Ambassador Partner choose to terminate their account voluntarily within the first 7 days of onboarding, they are eligible for a full refund of the onboarding fee.</p>
                        </li>
                        <li>
                            <h3>Involuntary Termination:</h3>
                            <p>If CollegeClub terminates the account of a College/University, Company, or CC-Ambassador Partner for reasons unrelated to a breach of these terms, a pro-rata refund of the onboarding fee may be provided, based on the time remaining in the minimum active account period.</p>
                        </li>
                    </ol>
                    <hr />

                    <h3>Modifications</h3>
                    <p>CollegeClub may update or modify these terms at any time. Users will be notified of any changes, and continued use of the Platform constitutes acceptance of the modified terms.</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Terms
