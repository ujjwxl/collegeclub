import React, { useState } from "react";
import backgroundImage from "../../assets/home-1.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Signup = () => {

  const [accountType, setAccountType] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [phoneNumberModal, setPhoneNumberModal] = useState(true);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");

  const navigate= useNavigate();

  const sendOTP = async () => {
    try {
      console.log(contactNumber);
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        contactNumber,
        recaptcha
      );
      setUser(confirmation);
    } catch (err) {
      console.error(err);
    }
  };

  const verifyOTP = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
      setPhoneNumberModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConfirmed) {
      toast('Please agree to the terms by checking the checkbox.');
      return;
    }

    if (password != confirmPassword) toast("The passwords do not match!");

    try {
      await axios
        .post("http://localhost:5000/auth/register", {
          accountType,
          organizationName,
          fullName,
          contactNumber,
          email,
          password,
        })
        .then((res) => {
          if (res.status == 200) {
            toast("Account created successfully!");
            navigate('/login');
          }
        })
        .catch((e) => {
          toast("Please check your signup details!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const isStudentOnboarding = localStorage.getItem('isStudentOnboarding');

  return (
    <div>
      <Navbar />
      {phoneNumberModal ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="home1-img signup-otp-page-image"
          />
          <div className="signup-otp-overlay">
            <div className="signup-otp-form">
              <div className="signup-otp-form-left">
                <div className="signup-otp-form-left-contents">
                  <h3>Welcome to CollegeClub!</h3>
                  <h4>Verify your phone number to begin</h4>
                  <PhoneInput
                    className="phone-input-top"
                    placeholder="Enter phone number"
                    defaultCountry="IN"
                    value={contactNumber}
                    maxLength={11}
                    onChange={setContactNumber}
                  />
                  <button onClick={sendOTP}>Send OTP</button> <br />
                  <div id="recaptcha"></div>
                  <input
                    type="text"
                    className="enterOTP"
                    placeholder="Enter the OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button onClick={verifyOTP}>Verify</button>
                </div>
              </div>

              <div className="signup-otp-form-right">
                <img src={backgroundImage} alt="" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="home1-img signup-page-image"
          />
          <div className="signup-overlay">
            <div className="signup-form">
              <form onSubmit={handleSubmit} className="signup-form-container">
                <div className="signup-form-left">
                  <h2>Signup</h2>
                  <h2>for New Account</h2>
                  <select
                    name="type"
                    value={accountType}
                    onChange={handleTypeChange}
                    required
                  >
                    <option value="" disabled selected>
                      Select account type
                    </option>
                    <option value="College">College</option>
                    <option value="Company">Company</option>
                    <option value="CC-Ambassador">CC Ambassador</option>
                    <option value="Student">Student</option>
                  </select>{" "}
                  <br />
                  <input
                    type="text"
                    name="organization"
                    placeholder={isStudentOnboarding !== "true" ? "Enter organization name" : "Enter college or company name"}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Your Full Name"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <PhoneInput
                    className="phone-input-bottom"
                    placeholder={contactNumber}
                    defaultCountry="IN"
                    value={contactNumber}
                    onChange={setContactNumber}
                    required
                    disabled
                  />
                  <br />
                </div>

                <div className="signup-form-right">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address" j
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|io|in|ac\.in)"
                    required
                  />{" "}
                  <br />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />{" "}
                  <br />
                  <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label className="checkbox-label">
                    <input type="checkbox" name="agreeToTerms" value={isConfirmed} onChange={() => setIsConfirmed((prev) => !prev)} required/>
                    <p>
                      By registering I agree to Terms & Privacy policy of <br />{" "}
                      the website.
                    </p>
                  </label>{" "}
                  <br />
                  <button type="submit">Create Account</button>
                  <p className="already-have-account">
                    Already have an account?<Link to={"/login"} style={{ 'color': 'orange', 'marginLeft': '4px', 'textDecoration': 'none' }}>Login</Link>{" "}
                    from here
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Signup;
