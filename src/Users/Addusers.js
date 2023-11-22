import React, { useState } from "react";
import { signup } from "../Auth/auth";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';

const Addusers = ({ user, state, show, handleClose }) => {
  const initialFormData = {
    email: "",
    password: "",
    fullname: "",
    company: "",
    sites: "",
    mobileno: "",
    role: "", 
  };

  const role = ["user", "employee", "manager"];
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
 console.log(name);
    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'role' ? value : value.trim(), // handle role change separately
    }));
  };

  const [showSuccessModal, setShow] = useState(false);

  const handleCloseSuccess = () => setShow(false);
  const handleShowSuccess = () => setShow(true);

  const handleSignupClick = async () => {
    try {
      console.log("FormData before signup:", formData);
      

      const newUser = await signup(formData);
      // toast.success('Account created successfully!');
      console.log("loggedin user", user);
      handleShowSuccess();
      handleClose();
      
    } catch (error) {
      console.error("Signup error:", error.message);
      toast.error('Error creating account. Please try again.');
    }
  };
  const handleCopyCredentials = () => {
    // Copy email and password to clipboard
    const credentialsText = `Email: ${formData.email}\nPassword: ${formData.password}`;
    navigator.clipboard.writeText(credentialsText);

    // Optionally, you can provide a user feedback
    toast.success("Credentials copied to clipboard!");
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
              <label>Role:</label>

              <Form.Select
                aria-label="Default select example"
                name='role'
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="user">User</option>
                <option value="employee">Supervisor   </option>
                <option value="manager">Manager </option>
              </Form.Select>
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
      <Modal show={showSuccessModal} onHide={handleCloseSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Account Created Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                value={formData.email}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={formData.password}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleCopyCredentials} >
            Send credentials to user
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