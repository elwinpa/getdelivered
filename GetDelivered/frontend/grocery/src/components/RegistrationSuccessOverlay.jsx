import React from 'react';


const RegistrationSuccessOverlay = ({ onClose,registerDetails }) => {
  return (
    <div className="register-overlay-container">
      <div className="register-overlay-content">
        {registerDetails  && registerDetails.error ?
          <>
            <h2>Registration Not Successful!</h2>
            <p>EmailId already exists</p>
          </>
          :
          <>
            <h2>Registration Successful!</h2>
            <p>Thank you for registering.</p>
          </>
        }
        
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegistrationSuccessOverlay;
