import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';

const Editprofile = () => {
  return (
    <>
    <h3 style={{textAlign:'center'}}>Update Profile</h3>
    <div style={{ marginTop: '20px' }} className='shadow p-5 mb-3' >
      <Row>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
          <input type="email" name="fullanme" className="form-control"  />
        </Col>
       
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
          <input type="text" name="email" className="form-control" />
        </Col>

         
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</label>
          <input type="text" name="mobileno" className="form-control"  />
        </Col>
      </Row>
      
      <div style={{ marginTop: '20px' }}>
        <Button variant="primary" style={{ marginRight: '10px' }} >
          Update
        </Button>
    
      </div>
    </div>
    
    </>
    
  )
}

export default Editprofile