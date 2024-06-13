import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import apply from "../../assets/mail.png";
import review from "../../assets/documents.png";
import offer from "../../assets/job-offer.png";
import payment from "../../assets/credit-card.png";
import arrow from "../../assets/right-arrow.png";
import downarrow from "../../assets/down-arrow.png";
import duration from "../../assets/clock.png";
import level from "../../assets/signal.png";
import language from "../../assets/language.png";
import medal from "../../assets/medal.png";
import play from "../../assets/play.png";
import axios from 'axios';
import "./DashboardBox.css";

const DashboardBox = ({onShowAdmissionForm}) => {

  const [userData, setUserData] = useState(null);

  const userId = localStorage.getItem('id');

  let selectedCourse = localStorage.getItem('selectedCourse'); // it will be null if a course is not selected
  selectedCourse = JSON.parse(selectedCourse); // used for showing card on the student dashboard

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        return;
      }

      // http://localhost:5000/auth/user?userId=${userId}

      try {
        const response = await axios.get(`http://localhost:5000/auth/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // const checkoutHandler = async(amount) => {
  //   const {data:{key}} = await axios.get("http://localhost:5000/api/getkey")
  //   // const {data:{order}} = await axios.post("http://localhost:5000/checkout",{amount})
  //   const {data:{order}} = await axios.post("http://localhost:5000/checkout")

  //   console.log(window);

  //   const options ={
  //     key, 
  //     amount: 5000,
  //     currency:"INR",
  //     name:"Varun Sharma",
  //     description:"Razorpay tutorial",
  //     image:"https://avatars.githubusercontent.com/u/96648429?s=96&v=4",
  //     order_id: order.id,
  //     callback_url:"http://localhost:5000/paymentverification",
  //     prefill:{
  //       name:"Varun Sharma",
  //       email:"anandguptasir@gmail.com",
  //       contact:"1234567890"
  //     },
  //     notes:{
  //       "address":"razorapy official"
  //     },
  //     theme:{
  //       "color":"#3399cc"
  //     }
  //   };
  //   // const razor = new window.Razorpay(options);
  //   const razor = new window.Razorpay(options);
  //   razor.open();

  // }

  const checkoutHandler = async (amount) => {
    const { data: { key } } = await axios.get("http://localhost:5000/api/getkey")
    // const {data:{order}} = await axios.post("http://localhost:5000/checkout",{amount})
    const { data: { order } } = await axios.post("http://localhost:5000/checkout")

    console.log(window);

    const options = {
      key,
      amount: 5000,
      currency: "INR",
      name: userData.fullname,
      description: "Onboading Fee",
      image: "https://avatars.githubusercontent.com/u/96648429?s=96&v=4",
      order_id: order.id,
      callback_url: `http://localhost:5000/paymentverification?userid=${userId}`,
      prefill: {
        name: userData.fullname,
        email: userData.email,
        contact: userData.contactNumber
      },
      notes: {
        "address": "razorapy official"
      },
      theme: {
        "color": "#3399cc"
      }
    };
    // const razor = new window.Razorpay(options);
    const razor = new window.Razorpay(options);
    razor.open();

  }

  return (
    <div className="dashboard-box" style={{overflow: "scroll"}}>
      <div className="dashboard-box-container">
        {/* <h2>You have signed up successfully!</h2> */}
        {/* <h3>Continue to payment to verify the account</h3>
        <button onClick={checkoutHandler}>Continue to Payment</button> */}

        {/* {userData && userData.paymentStatus ? (
            <>
              <h3>You have paid successfully</h3>
              <p>Complete the form to onboard successfully</p>
              <Link to={'/form/profile'}><button className="dashboard-payment-button">Complete application form</button></Link>
            </>
          ) : (
            <>
              <h3>Continue to payment to verify the account</h3>
              <button className="dashboard-payment-button" onClick={checkoutHandler}>Continue to Payment</button>
            </>
          )} */}


        {userData && userData.accountType != "Student" ? ( // if account type is not student we will show to pay
          userData && userData.paymentStatus ? ( // if paid we will show to complete form if form is completed we will show greeting message
            <>
              {userData.applicationFormCompleted ? (
                <>
                  <h3>Welcome back!, {userData.organizationName}</h3>
                  <h3>What would you like to do today?</h3>
                </>
              ) : (
                <>
                  <h3>You have paid successfully</h3>
                  <p>Complete the form to onboard successfully</p>
                  <Link to={'/form/profile'}><button className="dashboard-payment-button">Complete application form</button></Link>
                </>
              )}
            </>
          ) : (
            <>
              <h3>Continue to payment to verify the account</h3>
              <button className="dashboard-payment-button" onClick={checkoutHandler}>Continue to Payment</button>
            </>
          )
        ) : ( // this part is for when the account type is student
          selectedCourse ? ( // this is for when the user has selected a course
            <>
              <h3>Hey {userData && userData.fullName}, Welcome to CollegeClub Learner's Program</h3>
              <h3>You are applying for</h3>
              {/* <h3>[Object]</h3> */}
              <div className="skills-course-card" key={selectedCourse.id}>
                <img
                  src={selectedCourse.courseImage}
                  alt=""
                  className="skills-course-card-img"
                />
                <h3>{selectedCourse.courseName}</h3>
                <p className="instructor">{selectedCourse.courseInstructor}</p>
                <p>{selectedCourse.price}</p>
                {/* <button
                  className="skills-button"
                  onClick={() => handleViewMore(selectedCourse)}
                >
                  View more
                </button> */}
              </div>

              <div className="howtoapply">
                <h2>How to Apply?</h2>
                <div className="apply-section">
                  <div className="app-submit">
                    <img src={apply}></img>
                    <h3>Complete Application</h3>
                    <p>Fill out an application giving basic details</p>
                  </div>
                  <img className="rightarrow" src={arrow}></img>
                  <img className="downarrow" src={downarrow}></img>
                  <div className="app-submit">
                    <img src={review}></img>
                    <h3>Review + Shortlisting</h3>
                    <p>
                      On selection, an offer letter will be sent confirming
                      your admission to the program
                    </p>
                  </div>
                  <img className="rightarrow" src={arrow}></img>
                  <img className="downarrow" src={downarrow}></img>
                  <div className="app-submit">
                    <img src={offer}></img>
                    <h3>Offer Letter & Reserve Seat</h3>
                    <p>
                      Reserve your seat by payin the block amount of Rs 5000
                      to kickstart your journey
                    </p>
                  </div>
                  <img className="rightarrow" src={arrow}></img>
                  <img className="downarrow" src={downarrow}></img>
                  <div className="app-submit">
                    <img src={payment}></img>
                    <h3>Payment</h3>
                    <p>Fill out an application giving basic details</p>
                  </div>
                </div>
              </div>

              <button className="form-submit-button" style={{marginTop: '20px'}} onClick={onShowAdmissionForm}>Let's get started</button>
            </>
          ) : ( // this is when the user has not selected a course
            <>
              <h3>Start your learning journey today</h3>
              <h3>Select a course to get started</h3>
            </>
          )
        )}

        {/* // {userData && userData.paymentStatus ? (
        //   <>
        //     {userData.applicationFormCompleted ? (
        //       <>
        //         <h3>Welcome back!, {userData.organizationName}</h3>
        //         <h3>What would you like to do today?</h3>
        //       </>
        //     ) : (
        //       <>
        //         <h3>You have paid successfully</h3>
        //         <p>Complete the form to onboard successfully</p>
        //         <Link to={'/form/profile'}><button className="dashboard-payment-button">Complete application form</button></Link>
        //       </>
        //     )}
        //   </>
        // ) : (
        //   <>
        //     <h3>Continue to payment to verify the account</h3>
        //     <button className="dashboard-payment-button" onClick={checkoutHandler}>Continue to Payment</button>
        //   </>
        // )} */}


      </div>
    </div>
  );
};

export default DashboardBox;
