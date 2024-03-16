import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Home/Footer.jsx";
import backgroundImage from "../../assets/home-1.jpg";
import logo from "../../assets/collegeclub-logo.png";

const Login = () => {
  return (
    <div>
      <Navbar />
      <img src={backgroundImage} alt="" className="home1-img" />

      <div className="login-overlay">
        <div className="login-component">
          <img src={logo} alt="Club Logo" className="CC-logo"></img>
          <div className="login-box">
            <p className="header">Signin or Signup<br></br> to Continue</p>
            <div className="input-container">
              <input type="text" id="username" placeholder="Email id" />
            </div>
            <div className="input-container">
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="remember-forgot">
              <div className="checkbox-comp">
                <input type="checkbox"></input>
                <label>Remember me</label>
              </div>
              <a href="#">Forgot Password?</a>
            </div>
            <button className="login-btn">Login</button>
            <p className="no-account">No account? <Link>Create one!</Link></p>
            <Link className="terms">Privacy Policy</Link><span> | </span><Link className="terms">Terms</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
