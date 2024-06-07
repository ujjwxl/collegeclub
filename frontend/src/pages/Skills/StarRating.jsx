import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i}>&#9733;</span>); 
    } else {
      stars.push(<span key={i}>&#9734;</span>); 
    }
  }
  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
