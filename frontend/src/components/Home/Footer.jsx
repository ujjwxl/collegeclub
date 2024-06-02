import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import linkedInLogo from '../../assets/linkedin-logo.png'
// import linkedInLogo from '../../assets/linkedin1-logo.png'
import twitterLogo from '../../assets/twitter-logo.png'
import facebookLogo from '../../assets/facebook-logo.png'
import instagramLogo from '../../assets/instagram-logo.png'
import youtubeLogo from '../../assets/youtube-logo.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-column">
                <h4>Company</h4>
                <ul>
                    <Link to={'/about'}><li>About Us</li></Link>
                    <Link to={'/mission'}><li>Mission & Vision</li></Link>
                    <Link to={'/contact'}><li>Contact</li></Link>
                    <Link to={'/privacy'}><li>Privacy</li></Link>
                    <Link to={'/terms'}><li>Terms</li></Link>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Account</h4>
                <ul>
                    <Link to={'/register'}><li>Onboarding</li></Link>
                    <Link to={'/login'}><li>Login</li></Link>
                </ul>
                {/* <div className="spacer"></div>
                <h4>Other Links</h4>
                <ul>
                    <li>Career</li>
                    <li>FAQs</li>
                    <li>Feedback & Suggestions</li>
                </ul> */}
            </div>
            <div className="footer-column">
                <h4>Other Links</h4>
                <ul>
                    <Link to={'/career'}><li>Career</li></Link>
                    <Link to={'/faqs'}><li>FAQs</li></Link>
                    <Link to={'/feedback'}><li>Feedback and Suggestions</li></Link>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Contact Us</h4>
                <p>CIMP-BIF Building,</p>
                <p>Mithapur Farm Area,</p>
                <p>Mithapur, Patna,</p>
                <p>Bihar 800001 India</p>
                <p>+91 7368071436</p>
                <p>support@collegeclub.io</p>
                <div className="footer-social-links">
                    <img src={linkedInLogo} alt="" />
                    <img src={twitterLogo} alt="" />
                    <img src={facebookLogo} alt="" />
                    <img src={instagramLogo} alt="" />
                    <img src={youtubeLogo} alt="" />
                </div>
                    <p className='copyright'>© 2024 CollegeClub.</p>
            </div>
        </footer>
    );
};

export default Footer;
