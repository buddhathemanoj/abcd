import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const handleChangeProfile =() => {
    navigate('/edit-profile')
  }

  const handleChangePassword = () =>{
    navigate('/change-password')
  }

  return (
    <>
    <p className='mt-3 mb-3'><Link to="#" style={{ textDecoration: "none" }}><FaArrowLeft /> Back to view all permit</Link></p>
    
    <div style={{ marginTop: '20px' }}>
      <Row>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
          <input type="email" name="fullanme" className="form-control" value={storedUser.fullname}  />
        </Col>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Company</label>
          <input type="text" name="company" className="form-control" value={storedUser.company} />
        </Col>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
          <input type="text" name="email" className="form-control" value={storedUser.email}  />
        </Col>
      </Row>
      <Row>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Sites</label>
          <input type="text" name="sites" className="form-control" value={storedUser.sites}  />
        </Col>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Roles</label>
          <input type="text" name="sites" className="form-control" value={storedUser.role}  />
        </Col>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</label>
          <input type="text" name="mobileno" className="form-control" value={storedUser.mobileno}  />
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Button variant="primary" style={{ marginRight: '10px' }} onClick={handleChangeProfile}>
          Edit Profile
        </Button>
        <Button variant="outline-primary" onClick={handleChangePassword}>Change Password</Button>
      </div>
    </div>
    </>
  );
};

export default Account;