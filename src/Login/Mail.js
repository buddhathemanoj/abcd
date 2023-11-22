import React from 'react'
import Chat from '../Asset/Chat.png'
import CloseButton from 'react-bootstrap/CloseButton';
import { Link } from 'react-router-dom';

const Mail = () => {
  return (
    <div className="login-container">
      <div className='overlay'>
        <img src={Chat} alt="profile" />
        <div>
          <h2 style={{ float: 'left' }}>Check Your Mail </h2><Link to='/' className='d-flex justify-content-end'><CloseButton /></Link><br></br>
          <div className="mb-3 width300">
            <p style={{ clear: 'left' }}>We have sent a link to your mail,check it</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mail