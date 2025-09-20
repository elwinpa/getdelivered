import React from 'react';


const LoginFailure = ({ onClose }) => {
  return (
    <div className="register-overlay-container">
      <div className="register-overlay-content">
        <h2>InValid Credentials</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginFailure;
