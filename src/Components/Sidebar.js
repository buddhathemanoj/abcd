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
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <NavLink to="/dashboard"> <FontAwesomeIcon style={{marginRight:'5px'}} icon={faHome} />Dashboard</NavLink>
      <NavLink to="/sites"><FontAwesomeIcon style={{marginRight:'5px'}} icon={faSitemap} />Sites</NavLink>
      <NavLink to="/maps"><FontAwesomeIcon style={{marginRight:'5px'}} icon={faMap} />Maps</NavLink>
      <NavLink to="/users"><FontAwesomeIcon style={{marginRight:'5px'}} icon={faUser} />Users</NavLink>
      <NavLink to="/all-permits"><FaWpforms style={{marginRight:'5px'}} />All Permits</NavLink>
      <NavLink to="/all-templates"><CgTemplate style={{marginRight:'5px'}} />All Templates</NavLink>
      <NavLink to="/account"><MdOutlineManageAccounts style={{marginRight:'5px'}} />Account</NavLink>
      <NavLink to="/forms-download"><CiSaveDown2  style={{marginRight:'5px'}}/>Forms Download</NavLink>
      <NavLink to="/feedback-form"><MdFeedback style={{marginRight:'5px'}} />Feedback Form</NavLink>
      <NavLink to="/logout"><CiLogout style={{marginRight:'5px'}} />Logout</NavLink>
    </div>
  );
};

export default Sidebar;
