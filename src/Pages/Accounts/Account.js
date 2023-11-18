import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./account.css"
 
const Account = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <>
    <p className='mt-3 mb-3'><Link to="#" style={{ textDecoration: "none" }}><FaArrowLeft /> Back to view all permit</Link></p>
    
    <div style={{ marginTop: '20px' }}>
      <Row style={{marginBottom:"30px"}}>
        <Col>
          {/* <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
          <input type="email" name="fullanme" className="form-control" value={storedUser.fullname}  /> */}
          <h5 className='user-heading'>Full Name</h5>
          <p className='user-detail'>{storedUser.fullname}</p>
        </Col>
        <Col>
          {/* <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Company</label>
          <input type="text" name="company" className="form-control" value={storedUser.company} /> */}
          <h5  className='user-heading'>Company</h5>
          <p className='user-detail'>{storedUser.company}</p>
        </Col>
        <Col>
          {/* <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
          <input type="text" name="email" className="form-control" value={storedUser.email}  /> */}
          <h5 className='user-heading'>Email</h5>
          <p className='user-detail'>{storedUser.email}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Sites</label>
          <input type="text" name="sites" className="form-control" value={storedUser.sites}  /> */}
          <h5 className='user-heading'>Sites</h5>
          <p className='user-detail'>{storedUser.sites}</p>
        </Col>
        <Col>
          {/* <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Roles</label>
          <input type="text" name="sites" className="form-control" value={storedUser.role}  /> */}
          <h5 className='user-heading'>Roles</h5>
          <p className='user-detail'>{storedUser.role}</p>
        </Col>
        <Col>
          {/* <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</label>
          <input type="text" name="mobileno" className="form-control" value={storedUser.mobileno}  /> */}
          <h5 className='user-heading'>Phone Number</h5>
          <p className='user-detail'>{storedUser.mobileno}</p>
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Button variant="primary" style={{ marginRight: '10px' }} className='edit-profile-btn'>
          Edit Profile
        </Button>
        <Button variant="outline-primary" className='change-password-btn'>Change Password</Button>
      </div>
    </div>
    </>
  );
};

export default Account;