import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Home/Footer';
import backgroundImage from '../../assets/home-1.jpg';
import './FAQs.css';

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/getfaqs');
                setFaqs(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        };

        fetchFaqs();
    }, []);

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
                        {faqs.map((item, index) => (
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
                                        <p>{item.answer}</p>
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
    );
};

export default Faqs;
