import React from 'react';
import './Accordion.css';

const Accordion = ({ title, content, isActive, onToggle }) => {
  return (
    <div className="accord-item">
      <div className="accord-title" onClick={onToggle}>
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className="accord-content">{content}</div>}
    </div>
  );
};

export default Accordion;
