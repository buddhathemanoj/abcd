import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaWpforms } from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
import { MdFeedback } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { faHome, faSitemap, faMap, faUser } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css'
import logo from "../Asset/JCET-Group-Emblem 1.png"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { signOutUser } from "../Auth/auth";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isClick, Setclick] = useState(1)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 const location = useLocation()

  const clickToSet = (index) => {
    Setclick(index)
  }
  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      await signOutUser(); 
      handleClose();
      navigate("/")

    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? { backgroundColor: '#FFFFFF', color: '#022088' } : null;
  };


  return (
    <div className="sidebar-wrapper">
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <img src={logo} alt="logo" width={100} />
      </div>
      <NavLink to="/dashboard" style={isActive('/dashboard')}> <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faHome} />Dashboard</NavLink>
      <NavLink to="/sites" style={isActive('/sites')}><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faSitemap} />Sites</NavLink>
      <NavLink to="/maps" style={isActive('/maps')}><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faMap} />Maps</NavLink>
      <NavLink to="/users" style={isActive('/users')}><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faUser} />Users</NavLink>
      <NavLink to="/all-permits" style={isActive('/all-permits')}><FaWpforms style={{ marginRight: '5px' }} />All Permits</NavLink>
      <NavLink to="/all-templates" style={isActive('/all-templates')}><CgTemplate style={{ marginRight: '5px' }} />All Templates</NavLink>
      <NavLink to="/account" style={isActive('/account')}><MdOutlineManageAccounts style={{ marginRight: '5px' }} />Account</NavLink>
      <NavLink to="/forms-download" style={isActive('/forms-download')}><CiSaveDown2 style={{ marginRight: '5px' }} />Forms Download</NavLink>
      <NavLink to="/feedback-form" style={isActive('/feedback-form')}><MdFeedback style={{ marginRight: '5px' }} />Feedback Form</NavLink>
      <NavLink onClick={handleShow}><CiLogout style={{ marginRight: '5px' }} />Logout</NavLink>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGOUT</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
