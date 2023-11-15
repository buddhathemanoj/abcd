import React, { useState } from "react";
import { signup } from "../Auth/auth";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Modal,Button } from "react-bootstrap";
const Addusers = ({user,state, show, handleClose}) => {
    const initialFormData = {
        email: "",
        password: "",
        fullname: "",
        company: "",
        sites: "",
        mobileno: "",
      };
    
      const [formData, setFormData] = useState(initialFormData);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSignupClick = async () => {
        try {
          const newUser = await signup(formData);
          console.log("New user created:", newUser);
          Navigate("/dashboard")
        } catch (error) {
          console.error("Signup error:", error.message);
        }
      };
    
return(
<div>
<Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h2>Signup</h2>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <label>Full Name:</label>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleInputChange}
      />
      <label>Company:</label>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleInputChange}
      />
      <label>Sites:</label>
      <input
        type="text"
        name="sites"
        value={formData.sites}
        onChange={handleInputChange}
      />
      <label>Mobile Number:</label>
      <input
        type="text"
        name="mobileno"
        value={formData.mobileno}
        onChange={handleInputChange}
      />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSignupClick}>
          Create User
        </Button>
      </Modal.Footer>
    </Modal>







     
</div>
)
}

const mapStateToProps = (state) => ({
    user: state.auth.user, 
  });
  
  export default connect(mapStateToProps)(Addusers);