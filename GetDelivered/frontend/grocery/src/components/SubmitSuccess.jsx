import React from 'react';


const SubmitSuccess = ({ onClose }) => {
  return (
    <div className="register-overlay-container">
      <div className="register-overlay-content">
        <h2>Order was submitted Successfully</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SubmitSuccess;
