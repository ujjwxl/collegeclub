import React from 'react'
import { useState } from 'react'
import { toast } from 'sonner';
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Feedback.css'

const Feedback = () => {

    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:5000/auth/feedbackform`, {
                name,
                mobileNumber,
                email,
                type,
                message
            })
                .then(res => {
                    if (res.status == 200) {
                        toast("Feedback sent successfully!")
                    }
                })
                .catch(e => {
                    toast("Feedback could not be submitted!")
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className='home1-img' />
            <div className='feedback-overlay dashboard-container'>
                <div className="feedback-page-contents">
                    <form onSubmit={handleSubmit}>
                        <h2>Feedback & Suggestions</h2>
                        <hr />

                        <p>Feel free to send your Feedback & Suggestions</p>
                        <p>Your valuable feedbacks & suggestions help us improve and service your better...</p>

                        <p>We would love to hear you</p>
                        <div className="form-input-flex-two">
                            <div className="form-input-group">
                                <label htmlFor="collegename">Name</label>
                                <input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="form-input-group">
                                <label htmlFor="collegename">Mobile no.</label>
                                <input
                                    type="text"
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    placeholder="Enter your mobile number"
                                />
                            </div>
                        </div>

                        <div className="form-input-flex-two">
                            <div className="form-input-group">
                                <label htmlFor="collegename">Email</label>
                                <input
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-input-group  select-type">
                                <label htmlFor="collegename">Institute Type</label>
                                <select value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">Select Type</option>
                                    <option value="feedback">Feedback/Suggestion</option>
                                    <option value="complain">Complain</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            name=""
                            id=""
                            cols="30"
                            rows="7 "
                            className='feedback-textarea'
                            placeholder='Enter your feedback, suggestions, complain...'
                        ></textarea>

                        <button type='submit' className='form-submit-button feedback-submit-button'>Send Feedback</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Feedback
