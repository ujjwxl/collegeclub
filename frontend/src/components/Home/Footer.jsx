import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-column">
                <h4>Company</h4>
                <ul>
                    <li>About Us</li>
                    <li>Mission & Vision</li>
                    <li>Contact</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Account</h4>
                <ul>
                    <li>Onboarding</li>
                    <li>Login</li>
                </ul>
                <div className="spacer"></div>
                <h4>Other Links</h4>
                <ul>
                    <li>Career</li>
                    <li>FAQs</li>
                    <li>Feedback & Suggestions</li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>Contact Us</h4>
                <p>CIMP-BIF Building,</p>
                <p>Mithapur Rd,</p>
                <p>Mithapur Farm Area,</p>
                <p>Mithapur, Patna,</p>
                <p>Bihar 800001 India</p>
                <p>+91 7368071436</p>
                <p>support@collegeclub.io</p>
            </div>
        </footer>
    );
};

export default Footer;
