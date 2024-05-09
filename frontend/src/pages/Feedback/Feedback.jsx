import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Home/Footer'
import backgroundImage from '../../assets/home-1.jpg'
import './Feedback.css'

const Feedback = () => {

    return (
        <>
            <Navbar />
            <img src={backgroundImage} alt="" className='home1-img' />
            <div className='feedback-overlay dashboard-container'>
                <div className="feedback-page-contents">
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
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-input-group">
                            <label htmlFor="collegename">Mobile no.</label>
                            <input
                                type="text"
                                onChange={(e) => setPromo(e.target.value)}
                                placeholder="Enter your mobile number"
                            />
                        </div>
                    </div>

                    <div className="form-input-flex-two">
                        <div className="form-input-group">
                            <label htmlFor="collegename">Email</label>
                            <input
                                type="text"
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-input-group form-select">
                            <label htmlFor="collegename">Institute Type</label>
                            <select>
                                <option value="">Select Type</option>
                                <option value="">Feedback/Suggestion</option>
                                <option value="">Complaint</option>
                                <option value="">Others</option>
                            </select>
                        </div>
                    </div>

                    <textarea
                        onChange={(e) => setAboutCollege(e.target.value)}
                        name=""
                        id=""
                        cols="30"
                        rows="7 "
                        className='feedback-textarea'
                        placeholder='Enter your feedback, suggestions, complain...'
                    ></textarea>

                    <button className='form-submit-button feedback-submit-button'>Send Feedback</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Feedback
