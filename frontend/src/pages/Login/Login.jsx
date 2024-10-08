import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Home/Footer.jsx";
import backgroundImage from "../../assets/home-1.jpg";
import logo from "../../assets/collegeclub-logo.png";
import { toast } from "sonner";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      })
        .then(res => {
          if (res.status == 200) {
            const { userData, token } = res.data;
            const { userId, accountType, applicationFormCompleted, fullName } = userData;
            localStorage.setItem('id', userId);
            localStorage.setItem('fname', fullName);
            localStorage.setItem('type', accountType);
            localStorage.setItem('applicationFormCompleted', applicationFormCompleted);
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(userData));
            navigate('/dashboard');
          }
        })
        .catch(e => {
          toast("Please check your login details!")
          console.log(e);
        })
    }
    catch (e) {
      toast("Please check your login details!")
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
                <a href="/reset">Forgot Password?</a>
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
            </form>
            <p className="no-account">
              No account? <Link to={"/register"}>Create one!</Link>
            </p>
            <Link to='/privacy' className="terms">Privacy Policy</Link>
            <span> | </span>
            <Link to='/terms' className="terms">Terms</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
