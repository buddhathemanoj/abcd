
import React from "react";
import { NavLink } from "react-router-dom";
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
import Modal from 'react-bootstrap/Modal';

const UserSidebar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="sidebar-wrapper">
      <NavLink to="/user-dashboard"> <FontAwesomeIcon style={{marginRight:'5px'}} icon={faHome} />Dashboard</NavLink>
      <NavLink to="/my-permits"><FaWpforms style={{marginRight:'5px'}} />My Permits</NavLink>
      <NavLink to="/my-child-templates"><FaWpforms style={{marginRight:'5px'}} />My Child Permits</NavLink>
      <NavLink to="/my-templates"><CgTemplate style={{marginRight:'5px'}} />All Templates</NavLink>
      <NavLink to="/account"><MdOutlineManageAccounts style={{marginRight:'5px'}} />Account</NavLink>
      <NavLink to="/forms-download"><CiSaveDown2  style={{marginRight:'5px'}}/>Forms Download</NavLink>
      <NavLink to="/feedback-form"><MdFeedback style={{marginRight:'5px'}} />Feedback Form</NavLink>
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
          <Button variant="danger" onClick={handleClose}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserSidebar;
