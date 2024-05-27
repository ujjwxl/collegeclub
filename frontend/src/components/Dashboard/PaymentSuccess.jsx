import React from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import backgroundImage from "../../assets/home-1.jpg";
import Footer from "../Home/Footer";

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get("reference");

  return (
    <>
      <Navbar />
      <img src={backgroundImage} alt="" className="home1-img" />

      <div className="login-overlay">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div>
            <h2 className="payment">Payment Successful</h2>
            <h6>Payment ID: {paymentId}</h6>
          </div>
          <Link to={"/dashboard"} >
            <button className="payment-btn">Go to dashboard</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
