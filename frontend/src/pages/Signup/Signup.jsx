import React, { useState } from "react";
import backgroundImage from "../../assets/home-1.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import "./Signup.css";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  }
  
  return (
    <div>
      <Navbar />
      <img src={backgroundImage} alt="" className="home1-img" />

      <div className="signup-overlay">
        <div className="signup-form">
          <form onSubmit={handleSubmit} className="signup-form-container">
            <div className="signup-form-left">
              <h2>Signup</h2>
              <h2>for New Account</h2>
              <select name="type">
                <option value="" disabled selected>
                  Select account type
                </option>
                <option value="college">College</option>
                <option value="company">Company</option>
                <option value="ccAmbassador">CC Ambassador</option>
              </select>{" "}
              <br />
              <input
                type="text"
                name="organization"
                placeholder="Enter organization name"
              />{" "}
              <br />
              <input
                type="text"
                name="organization"
                placeholder="Enter organization name"
              />{" "}
              <br />
              <input
                type="text"
                name="organization"
                placeholder="Enter organization name"
              />{" "}
              <br />
              <input
                type="text"
                name="organization"
                placeholder="Enter organization name"
              />
            </div>

            <div className="signup-form-right">
              <input
                type="text"
                name="organization"
                placeholder="Enter organization name"
              />{" "}
              <br />
              <input
                type="text"
                name="organization"
                placeholder="Enter organization name"
              />{" "}
              <br />
              <input
                type="email"
                name="organization"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <br />
              <input
                type="password"
                name="organization"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label class="checkbox-label">
                <input type="checkbox" name="agreeToTerms" />
                <p>
                  By registering I agree to Terms & Privacy policy of <br /> the
                  website.
                </p>
              </label>{" "}
              <br />
              <button type="submit">Create Account</button>
              <p className="already-have-account">
                Already have an account? <Link to={"/login"}>Login</Link> from
                here
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
