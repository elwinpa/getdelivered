import React from 'react';


const LoginWarning = ({ onClose }) => {
  return (
    <div className="register-overlay-container">
      <div className="register-overlay-content">
        <h2>Please Log in to add to cart!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginWarning;
