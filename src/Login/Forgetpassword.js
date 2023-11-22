import React, { useState } from 'react';
import Rocket from '../Asset/Rocket.png';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Forgetpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSendInstruction = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      navigate('/mail');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      setError('Failed to send password reset email. Please check your email address.');
    }
  };

  return (
    <form onSubmit={handleSendInstruction}>
      <div className="login-container">
        <div className='overlay'>
          <img src={Rocket} alt="profile" />
          <div>
            <h2 style={{ float: 'left' }}>Reset Password </h2><br></br>
            <div className="mb-3 width300">
              <p style={{ clear: 'left' }}>Enter Your Email ID</p>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block width300">
              Send Instruction
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Forgetpassword;