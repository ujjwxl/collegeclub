import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";
import ErrorGif from "../../assets/error-gif.gif";

function ErrorPage() {
  return (
    <div className="error-page">
    <div className="err-right">
        <img src={ErrorGif} alt="Error GIF"></img>
      </div>
      <div className="err-left">
        <h3>Uh No!!</h3>
        
        <p>Looks like you're lost!</p>
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to="/"><button>Go to HomePage</button></Link>
      </div>
      
    </div>
  );
}

export default ErrorPage;
