import React from "react";
import axios from 'axios';  
import "./DashboardBox.css";

const DashboardBox = ()=> {

  const checkoutHandler = async(amount) => {
    const {data:{key}} = await axios.get("http://localhost:5000/api/getkey")
    // const {data:{order}} = await axios.post("http://localhost:5000/checkout",{amount})
    const {data:{order}} = await axios.post("http://localhost:5000/checkout")

    console.log(window);
    
    const options ={
      key, 
      amount: 5000,
      currency:"INR",
      name:"Varun Sharma",
      description:"Razorpay tutorial",
      image:"https://avatars.githubusercontent.com/u/96648429?s=96&v=4",
      order_id: order.id,
      callback_url:"http://localhost:5000/paymentverification",
      prefill:{
        name:"Varun Sharma",
        email:"anandguptasir@gmail.com",
        contact:"1234567890"
      },
      notes:{
        "address":"razorapy official"
      },
      theme:{
        "color":"#3399cc"
      }
    };
    // const razor = new window.Razorpay(options);
    const razor = new window.Razorpay(options);
    razor.open();

  }

  return (
    <div className="dashboard-box">
      <div className="dashboard-box-container">
        <h2>You have signed up successfully!</h2>
        <h3>Continue to payment to verify the account</h3>
        <button onClick={checkoutHandler}>Continue to Payment</button>
      </div>
    </div>
  );
};

export default DashboardBox;
