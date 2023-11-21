import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { getAllUsers, loginAndSendOTP, verifyOTP } from "../Auth/auth";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginClick = async () => {
    try {
      console.log("Attempting login...");
      const loggedInUser = await loginAndSendOTP({ email, password });
      setUser(loggedInUser);
      setShowModal(true);
      dispatch({ type: 'LOGIN', payload: loggedInUser });
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error.message);
    }
  }

  const handleVerifyOTP = async () => {
    try {
      const userId = user.uid;
      const verifyResult = await verifyOTP(userId, enteredOTP);
  
      if (verifyResult) {
        console.log("OTP Verified!");
        setIsOTPVerified(true);
        setShowModal(false);
  
        dispatch({ type: 'LOGIN', payload: user });
        localStorage.setItem('user', JSON.stringify(user));
  
        if (user.role === "admin" || user.role === "employee") {
          navigate('/dashboard');
        } else if (user.role === "user") {
          navigate('/user-dashboard');
        } else {
          navigate('/');
        }
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      setError(error.message);
      console.error('OTP verification error:', error.message);
    }
  }

  return (
    <div className="login-container">
      <div className='overlay'>
        <img src='https://cdn.animaapp.com/projects/655095d12540041bb7fc124b/releases/6553817a4281e83eb09235a4/img/profile@2x.png'
             alt="profile"
        />
        <div>
          {user && showModal ? (
            <div style={{justifyContent:'center',marginTop:'30px'}} className="otp-modal">
              <h4>Enter OTP</h4>
              <div className="mb-3 width300">
              <input type="text" className="form-control" value={enteredOTP} onChange={(e) => setEnteredOTP(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-lg btn-block width300" onClick={handleVerifyOTP}>Verify OTP</button>
              {error && <p className="text-danger">{error}</p>}
            </div>
          ) : (
            <div>
              <h2 style={{ float: 'left' }}>Sign In </h2>
              <div className="mb-3 width300">
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3 width300">
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
                <Link to='/forget-password' style={{ color: 'blue' }}>Forget password?</Link>
              </div>
              <button className="btn btn-primary btn-lg btn-block width300" onClick={handleLoginClick} style={{ marginTop: "4px" }}>
                Login
              </button>
              {error && <p className="text-danger">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login;