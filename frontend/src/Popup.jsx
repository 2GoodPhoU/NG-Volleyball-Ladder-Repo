import React from 'react'
import './App.css';

const Popup = ({ title, text, closePopup }) => {
  return (
    <div className="popup-container">
     <div className="popup-content">
      <h4>{title}</h4>
      <div>{text}</div>
      <button onClick={closePopup}>Close</button>
     </div>
    </div>
  );
};

export default Popup;