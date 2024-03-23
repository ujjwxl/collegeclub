// import React from 'react'

// const PaymentSuccess = () => {
//   return (
//     <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>Payment Successful</div>
//   )
// }

// export default PaymentSuccess

import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentId = searchParams.get('reference');

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div>
        <h2>Payment Successful</h2>
        <p>Payment ID: {paymentId}</p>
      </div>
      <Link to={'/dashboard'}><button>Go to dashboard</button></Link>
    </div>
    
    </>
  );
};

export default PaymentSuccess;