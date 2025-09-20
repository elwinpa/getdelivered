import React, { useState } from 'react';
import { loginReq } from '../redux/actions';
import { connect } from 'react-redux';
import Registration from './Registration';

const Login = ({ onClose, switchToRegistration, loginReq }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLoginEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const validateLoginForm = async () => {
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginEmail)) {
        setError('Please enter a valid email address');
        return;
      }

      if (loginPassword.length < 5) {
        setError('Password must be at least 5 characters long');
        return;
      }

      const payload = {
        email: loginEmail,
        password: loginPassword,
      };

      loginReq(payload);
      onClose();

  };

  /*const openRegistrationModal = () => {
    setModalOpen(true);
  };*/

  return (
    <div className="login-modal">
      <div className="login-form-container">
        <span className="close-icon-login" onClick={onClose}>
          &times;
        </span>

        <h1>Login</h1>
        <form>
          <div className="error-message">{error && <p>{error}</p>}</div>
          <label>Email:</label>
          <input type="email" value={loginEmail} onChange={handleLoginEmailChange} />

          <label>Password:</label>
          <input type="password" value={loginPassword} onChange={handleLoginPasswordChange} />

          <button type="button" onClick={validateLoginForm}>
            Login
          </button>

           {/* <div className="not-signed-in-link" onClick={openRegistrationModal}>
            <p>
              Not signed in?{' '}
              <span className="register-link" onClick={switchToRegistration}>
                Click here
              </span>{' '}
              to register.
            </p>
          </div>*/}
        </form>
      </div>

      {isModalOpen && (
        <Registration onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loginReq: (payload) => dispatch(loginReq(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
