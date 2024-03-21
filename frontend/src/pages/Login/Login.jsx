import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Home/Footer.jsx";
import backgroundImage from "../../assets/home-1.jpg";
import logo from "../../assets/collegeclub-logo.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user);
    //     // alert('login success')
    //     navigate('/dashboard')

    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error);
    //   });
    try {
      await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      })
        .then(res => {
          if (res.status == 200) {
            // alert("Signin successfully!");
            const userId = res.data.uid;
            sessionStorage.setItem('id', userId);
            navigate('/dashboard');
          }
        })
        .catch(e => {
          alert("Please check your signin details!")
          console.log(e);
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Navbar />
      <img src={backgroundImage} alt="" className="home1-img" />

      <div className="login-overlay">
        <div className="login-component">
          <img src={logo} alt="Club Logo" className="CC-logo"></img>
          <div className="login-box">
            <p className="header">
              Signin or Signup<br></br> to Continue
            </p>
            <form onSubmit={handleLogin}>
              <div className="input-container">
                <input type="email" id="username" placeholder="Email id" onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="input-container">
                <input type="password" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="remember-forgot">
                <div className="checkbox-comp">
                  <input type="checkbox"></input>
                  <label>Remember me</label>
                </div>
                <a href="#">Forgot Password?</a>
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
            </form>
            <p className="no-account">
              No account? <Link to={"/register"}>Create one!</Link>
            </p>
            <Link className="terms">Privacy Policy</Link>
            <span> | </span>
            <Link className="terms">Terms</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
