import React, { useState } from 'react';
import '../styles/RegistrationModal.scss';
import { useDispatch } from 'react-redux';
import { registerReq } from '../redux/actions';
import Login from './Login';


const Registration = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationErrors, setRegistrationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEqual = () => {
    return email === confirmEmail;
  };

  const validateForm = async () => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
    };

    // Validations for first name
    if (firstName === '') {
      errors.firstName = 'First name is required';
    }

    // Validations for last name
    if (lastName === '') {
      errors.lastName = 'Last name is required';
    }

    // Validations for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (email === '') {
      errors.email = 'Email is required';
    }

    if (confirmEmail === '') {
      errors.confirmEmail = 'Please re-enter the email';
    } else if (!handleEqual()) {
      errors.confirmEmail = 'The email addresses do not match';
    }

    // Validations for password
    if (password === '') {
      errors.password = 'Password is required';
    } else if (password.length < 5) {
      errors.password = 'Password must be at least 5 characters long';
    }

    setRegistrationErrors(errors);

    if (Object.values(errors).every((error) => error === '')) {
      try {
        const payload = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };

        dispatch(registerReq(payload));

        onClose();
      } catch (error) {
        console.error('Registration failed:', error.message);
      }
    }
  };

  const cancelRegistration = () => {
    setRegistrationErrors({
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      password: '',
    });
    onClose();
  };

  return (
    <div className="registration-modal">
      <span className="close-icon" onClick={cancelRegistration}>
        &times;
      </span>
      <div className="modal-header"></div>

      {!isAuthenticated && (
        <div className="registration-form-container">
          <form>
            <h1>Registration Form</h1>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={handleFirstNameChange} />
            <div className="error-message">{registrationErrors.firstName}</div>

            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={handleLastNameChange} />
            <div className="error-message">{registrationErrors.lastName}</div>

            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
            <div className="error-message">{registrationErrors.email}</div>

            <label>Confirm Email:</label>
            <input type="email" value={confirmEmail} onChange={handleConfirmEmailChange} />
            <div className="error-message">{registrationErrors.confirmEmail}</div>

            <label>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
            <div className="error-message">{registrationErrors.password}</div>

            <button type="button" onClick={validateForm}>
              Register
            </button>
          </form>
          {/*<div className="not-signed-in-link" onClick={() => setIsAuthenticated(true)}>
            <p>
              Already have an account? <span className="register-link">Sign in here</span>.
            </p>
          </div>*/}
        </div>
      )}

      {isAuthenticated && <Login onClose={() => setIsAuthenticated(false)} />}
    </div>
  );
};

export default Registration;
