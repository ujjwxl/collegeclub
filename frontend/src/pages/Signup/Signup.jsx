import React, { useState } from "react";
import backgroundImage from "../../assets/home-1.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Home/Footer";
import "./Signup.css";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from "../../firebase.js";
// import { doc, setDoc } from "firebase/firestore"; 

const Signup = () => {

  const [accountType, setAccountType] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [subDomain, setSubDomain] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTypeChange = (event) => {
    setAccountType(event.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // if(password != confirmPassword) alert('The passwords do not match!');
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //       console.log(user.uid);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(error);
  //     });
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password matches confirmPassword
    if (password !== confirmPassword) {
      alert('The passwords do not match!');
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;

      // Create document in Firestore
      const docRef = await addDoc(collection(db, 'users'), {
        accountType,
        organizationName,
        fullName,
        contactNumber,
        subDomain,
        userName,
        email,
        userId,
      });

      console.log('Document written with ID: ', docRef.id);
      alert('User created successfully')

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      alert(errorMessage);
    }
  }

  return (
    <div>
      <Navbar />
      <img src={backgroundImage} alt="" className="home1-img signup-page-image" />

      <div className="signup-overlay">
        <div className="signup-form">
          <form onSubmit={handleSubmit} className="signup-form-container">
            <div className="signup-form-left">
              <h2>Signup</h2>
              <h2>for New Account</h2>
              <select name="type" value={accountType} onChange={handleTypeChange}>
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
                onChange={(e) => setOrganizationName(e.target.value)}
              />{" "}
              <br />
              <input
                type="text"
                name="fullname"
                placeholder="Your Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />{" "}
              <br />
              <input
                type="text"
                name="phone"
                placeholder="Contact Number"
                onChange={(e) => setContactNumber(e.target.value)}
              />{" "}
              <br />
              <input
                type="text"
                name="subdomain"
                placeholder="Select subdomain"
                onChange={(e) => setSubDomain(e.target.value)}
              />
            </div>

            <div className="signup-form-right">
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                onChange={(e) => setUserName(e.target.value)}
              />{" "}
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <br />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              <br />
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
