import React, { useState } from "react";
import { signup } from "../Auth/auth";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addusers = ({ user, state, show, handleClose }) => {
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
      toast.success('Account created successfully!');
      Navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error('Error creating account. Please try again.');
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </Col>
            <Col>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-control"
              />
            </Col>
            <Col>
              <label>Full Name:</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="form-control"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="form-control"
              />
            </Col>
            <Col>
              <label>Sites:</label>
              <input
                type="text"
                name="sites"
                value={formData.sites}
                onChange={handleInputChange}
                className="form-control"
              />
            </Col>
            <Col>
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobileno"
                value={formData.mobileno}
                onChange={handleInputChange}
                className="form-control"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSignupClick}>
            Create Account
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Addusers);