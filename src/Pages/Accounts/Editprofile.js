import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import { updateProfileData } from '../../Auth/auth';



const Editprofile = ({userId}) => {
  const initialFormData = {
    fullname: '',
    email: '',
    phonenumber: '',
};

const [formData, setFormData] = useState(initialFormData);
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleSubmit = async () => {
  try {
    // Call the function to update the profile data
    await updateProfileData(userId, formData);
    console.log('Profile updated successfully:', formData);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    // Handle the error, show a message to the user, etc.
  }
};
 
  
  return (
    <>
    <h3 style={{textAlign:'center'}}>Update Profile</h3>
    <div style={{ marginTop: '20px' }} className='shadow p-5 mb-3' >
      <Row>
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Full Name</label>
          <input type="email" name="fullname" className="form-control"  value={formData.fullname}
                                onChange={handleInputChange}  />
        </Col>
       
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
          <input type="text" name="email" className="form-control"  value={formData.email}
                                onChange={handleInputChange} />
        </Col>

         
        <Col>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Phone Number</label>
          <input type="text" name="phonenumber" className="form-control"  value={formData.phonenumber}
                                onChange={handleInputChange} />
        </Col>
      </Row>
      
      <div style={{ marginTop: '20px' }}>
        <Button variant="primary" style={{ marginRight: '10px' }} onClick={handleSubmit}>
          Update
        </Button>
    
      </div>
    </div>
    
    </>
    
  )
}

export default Editprofile