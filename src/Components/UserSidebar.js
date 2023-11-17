
import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaWpforms } from "react-icons/fa6"; 
import { CiSaveDown2 } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
import { MdFeedback } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import logo from "../Asset/JCET-Group-Emblem 1.png"
import { faHome,faSitemap,faMap ,faUser} from '@fortawesome/free-solid-svg-icons';
import'../styles/sidebar.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserSidebar = () => {

  const [show, setShow] = useState(false);
  const [isClick, Setclick] = useState(1)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const clickToSet = (index) => {
    Setclick(index)
  }

  return (
    <div className="sidebar-wrapper">
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <img src={logo} alt="logo" width={100} />
      </div>
      <NavLink to="/user-dashboard"  className={isClick === 1 ? "active-tap" : ""} onClick={() => clickToSet(1)}> <FontAwesomeIcon style={{marginRight:'5px'}} icon={faHome} />Dashboard</NavLink>
      <NavLink to="/my-permits"  className={isClick === 2 ? "active-tap" : ""} onClick={() => clickToSet(2)}><FaWpforms style={{marginRight:'5px'}} />My Permits</NavLink>
      <NavLink to="/my-child-permit"  className={isClick === 3 ? "active-tap" : ""} onClick={() => clickToSet(3)}><FaWpforms style={{marginRight:'5px'}} />My Child Permits</NavLink>
      <NavLink to="/all-template"  className={isClick === 4 ? "active-tap" : ""} onClick={() => clickToSet(4)}><CgTemplate style={{marginRight:'5px'}} />All Templates</NavLink>
      <NavLink to="/account"  className={isClick === 5 ? "active-tap" : ""} onClick={() => clickToSet(5)}><MdOutlineManageAccounts style={{marginRight:'5px'}} />Account</NavLink>
      <NavLink to="/forms-download"  className={isClick === 6 ? "active-tap" : ""} onClick={() => clickToSet(6)}><CiSaveDown2  style={{marginRight:'5px'}}/>Forms Download</NavLink>
      <NavLink to="/feedback-form"  className={isClick === 7 ? "active-tap" : ""} onClick={() => clickToSet(7)}><MdFeedback style={{marginRight:'5px'}} />Feedback Form</NavLink>
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
