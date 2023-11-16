import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <>
    <p className='mt-3 mb-3'><Link to="#" style={{ textDecoration: "none" }}><FaArrowLeft /> Back to view all permit</Link></p>
    
    <div style={{ marginTop: '20px' }}>
      <Row>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
          <input type="email" name="email" className="form-control" />
        </Col>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Company</label>
          <input type="password" name="password" className="form-control" />
        </Col>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
          <input type="text" name="fullname" className="form-control" />
        </Col>
      </Row>
      <Row>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Sites</label>
          <input type="text" name="company" className="form-control" />
        </Col>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Roles</label>
          <input type="text" name="sites" className="form-control" />
        </Col>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</label>
          <input type="text" name="mobileno" className="form-control" />
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Button variant="primary" style={{ marginRight: '10px' }}>
          Edit Profile
        </Button>
        <Button variant="outline-primary">Change Password</Button>
      </div>
    </div>
    </>
  );
};

export default Account;