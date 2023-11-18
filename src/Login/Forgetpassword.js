import React from 'react';
import Rocket from '../Asset/Rocket.png';
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
  const navigate = useNavigate();

  const handleSendInstruction = () => {
    navigate('/mail');
  };

  return (
    <div className="login-container">
      <div className='overlay'>
        <img src={Rocket} alt="profile" />
        <div>
          <h2 style={{ float: 'left' }}>Reset Password </h2><br></br>
          <div className="mb-3 width300">
            <p style={{ clear: 'left' }}>Enter Your Email ID</p>
            <input type="email" className="form-control" />
          </div>
          <button className="btn btn-primary btn-lg btn-block width300" onClick={handleSendInstruction}>
            Send Instruction
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;