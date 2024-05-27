import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import backgroundImage from "../../assets/home-1.jpg";
import Footer from "../../components/Home/Footer";
import logo from "../../assets/collegeclub-logo.png";
import { toast } from "sonner";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/auth/reset-password", {
        email,
      });
    //   setMessage("Password reset email sent successfully");
      toast('Password reset email sent successfully');
    } catch (error) {
    //   setMessage("Error resetting password. Please try again.");
      toast("Error resetting password. Please try again.");
      console.error("Error resetting password:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <img src={backgroundImage} alt="" className="home1-img" />

      <div className="login-overlay">
        <div className="login-component">
          <img src={logo} alt="Club Logo" className="CC-logo"></img>
          <div className="forgot-box">
            <h3>Forgot Password</h3>
            <form onSubmit={handleResetPassword}>
            <div className="input-container">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              </div>
              <button className="login-btn" type="submit">Reset Password</button>
            </form>
            <p>{message}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
