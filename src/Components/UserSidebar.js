
import React from "react";
import { NavLink,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaWpforms } from "react-icons/fa6"; 
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
import { MdFeedback } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { faHome,faSitemap,faMap ,faUser} from '@fortawesome/free-solid-svg-icons';
import'../styles/sidebar.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { signOutUser } from "../Auth/auth";

const UserSidebar = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [show, setShow] = useState(false);
  const [isClick, Setclick] = useState(1)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const clickToSet = (index) => {
    Setclick(index)
  }

  const handleLogout = async () => {
    try {
      await signOutUser(); 
      handleClose();
      localStorage.removeItem('user');
      navigate("/")

    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? {backgroundColor: '#FFFFFF', color: '#022088'} : null;
  };

  return (
    <div className="sidebar-wrapper">
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
<h1>ABCD</h1>
      </div>
      <NavLink to="/user-dashboard"  style={isActive('/user-dashboard')}> <FontAwesomeIcon style={{marginRight:'5px'}} icon={faHome} />Dashboard</NavLink>
      <NavLink to="/my-permits"  style={isActive('/my-permits')}><FaWpforms style={{}} />My Permits</NavLink>
      <NavLink to="/my-child-permit"  style={isActive('/my-child-permit')}><FaWpforms style={{marginRight:'5px'}} />My Child Permits</NavLink>
      <NavLink to="/all-template"  style={isActive('/all-template')}><CgTemplate style={{marginRight:'5px'}} />All Templates</NavLink>
      <NavLink to="/account"   style={isActive('/account')}><MdOutlineManageAccounts style={{marginRight:'5px'}} />Account</NavLink>
      <NavLink to="/forms-download"   style={isActive('/forms-download')}><CiSaveDown2  style={{marginRight:'5px'}}/>Forms Download</NavLink>
      <NavLink to="/feedback-form"   style={isActive('/feedback-form')}><MdFeedback style={{marginRight:'5px'}} />Feedback Form</NavLink>
      <NavLink onClick={handleShow} ><CiLogout style={{marginRight:'5px'}} />Logout</NavLink>

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

export default UserSidebar;
