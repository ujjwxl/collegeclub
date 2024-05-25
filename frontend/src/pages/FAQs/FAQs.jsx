import React from 'react'
import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './FAQs.css'

const Faqs = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const items = [
        {
            question: 'Why CollegeClub?',
            answer: `
                <p>CollegeClub is a dynamic platform that connects students, colleges/universities, companies, and CC ambassador partners. It is a one-stop solution for educational opportunities, career connections, and collaborative initiatives.</p>
                <ul>
                    <li>Efficiency: Streamlined processes for admission, collaboration, and hiring.</li>
                    <li>Collaboration: Forge meaningful connections between students, colleges, and companies.</li>
                    <li>Opportunity: Unlock a world of possibilities for students, colleges, and companies alike.</li>
                </ul>
                <p>Join CollegeClub today and revolutionize the way education, recruitment, and collaboration intersect!</p>
            `
        },
        {
            question: 'How do I sign up for CollegeClub?',
            answer: 'Signing up for CollegeClub is easy! Simply click on the "Sign Up" button on the homepage, and follow the step-by-step registration process.'
        },
        {
            question: 'For Students',
            answer: `
                <p>How can students benefit from CollegeClub?</p>
                <p>Students can explore educational opportunities, connect with colleges, access career resources, and collaborate on projects with fellow students and companies.</p>
                <p>Are there any fees for students?</p>
                <p>No, there are no fees for students. CollegeClub is committed to providing a free and accessible platform for students.</p>
            `
        },
        {
            question: 'For Colleges/Universities',
            answer: `
                <p>How can colleges enhance their presence on CollegeClub?</p>
                <p>Colleges can create detailed profiles, showcase strengths, and connect with students. We offer tools for admissions, campus events, and alumni engagement.</p>
                <p>What is the process for colleges to join CollegeClub?</p>
                <p>Colleges can join by filling out our registration form. Once approved, they can set up their profiles and start connecting with students.</p>
            `
        },
        {
            question: 'For Companies',
            answer: `
                <p>How can companies use CollegeClub for recruiting?</p>
                <p>Companies can access a pool of talented students, post job opportunities, and participate in virtual or on-campus recruitment events.</p>
                <p>Is there a fee for companies to use CollegeClub?</p>
                <p>Yes, there may be a fee for companies, depending on the level of services and features they require. Contact our team for more information.</p>
            `
        },
        {
            question: 'For CC-Ambassador',
            answer: `
                <p>How can CC-Ambassador collaborate on CollegeClub?</p>
                <p>CC-Ambassador partners can explore collaboration opportunities, participate in events, and connect with other CC-Ambassador partners and institutions.</p>
            `
        },
        {
            question: 'Security and Privacy',
            answer: `
                <p>How does CollegeClub ensure user privacy?</p>
                <p>CollegeClub prioritizes user privacy. We employ robust security measures to protect user data, and we do not share personal information without consent.</p>
                <p>Is my data safe on CollegeClub?</p>
                <p>Yes, we take data security seriously. CollegeClub employs industry-standard encryption and security protocols to safeguard user data.</p>
            `
        },
        {
            question: 'Onboarding Fee',
            answer: `
                <p>For Colleges/Institutes and Enterprises/Companies (Rs. 4999)</p>
                <p>One-Time and Refundable:</p>
                <p>Emphasize that the onboarding fee is a one-time payment, which is also refundable. This encourages long-term commitment and ensures active participation.</p>
                <p>Minimum Active Account Duration:</p>
                <p>Specify that the onboarding fee comes with an agreement for a minimum active account duration of 3 years. This demonstrates a shared commitment to long-term collaboration and engagement.</p>
                <p>Premium Features for Companies:</p>
                <p>Highlight additional premium features or enhanced visibility on the platform that colleges and companies gain access to upon onboarding. This could include priority job postings, advanced analytics, or featured profiles.</p>
                <p>For CC-Ambassador (Rs. 999):</p>
                <p>CC-Ambassador Collaboration Opportunities:</p>
                <p>Communicate that the onboarding fee for CC-Ambassador partners opens doors to collaboration opportunities within the CollegeClub network. This may include joint events, cross-promotions, and shared initiatives.</p>
                <p>Network Access:</p>
                <p>Emphasize that the onboarding fee provides access to a network of colleges, companies, and other CC-Ambassador partners, creating a collaborative ecosystem for mutual growth.</p>
                <p>Promotional Tools:</p>
                <p>Provide CC-Ambassador partners with tools and features to promote their locations and services within the CollegeClub community. This could include a dedicated profile, promotional posts, or event sponsorships.</p>
                <p>Payment Process:</p>
                <p>Secure Payment Gateway:</p>
                <p>Ensure a secure and user-friendly payment gateway for a smooth onboarding process. Clearly communicate the payment methods accepted, such as credit/debit cards, bank transfers, or other relevant options.</p>
                <p>Transparent Invoicing:</p>
                <p>Provide transparent invoices detailing the onboarding fee, the services included, and any applicable terms and conditions. This helps build trust with partners.</p>
                <p>Receipt and Confirmation:</p>
                <p>Send an automated receipt and confirmation email once the payment is processed. Include relevant details, such as the onboarding date and any next steps.</p>
            `
        }
    ];

    const onTitleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };


    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className='home1-img' />
            <div className='faqs-overlay dashboard-container'>
                <div className="faqs-page-contents">
                    <h2>FAQs</h2>
                    <hr />

                    <p>Welcome to the CollegeClub FAQ page! Here, we've compiled answers to some of the most frequently asked questions about our platform.</p>

                    <h2>General Questions</h2>
                    <div className="accordion">
                        {items.map((item, index) => (
                            <div key={index} className="accordion-item">
                                <div
                                    className="accordion-title"
                                    onClick={() => onTitleClick(index)}
                                >
                                    <i
                                        className={`fas ${index === activeIndex ? 'fa-chevron-up' : 'fa-chevron-down'
                                            }`}
                                    ></i>
                                    {item.question}
                                </div>
                                {index === activeIndex && (
                                    <div className="accordion-content">
                                        <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <p>Contact us:</p>
                    <p>Still have questions? Feel free to reach out to our support team at [support@collegeclub.com]. We're here to help!</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Faqs
