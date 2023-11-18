import React, { useState } from "react";
import { connect } from "react-redux";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Userashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [showInfo, setShowInfo] = useState(true);

  // Handle the click event to hide the informational note
  const handleInfoClose = () => {
    setShowInfo(false);
  };

  

  // Display informational note
  const informationalNote = (
    <div style={{ background: '#E6F7FF', padding: '10px',border:"1px solid #91D5FF"}}>
      <span onClick={handleInfoClose} style={{ cursor: 'pointer', float: 'right', marginRight: '10px' }}>X</span>
     <p style={{lineHeight:"0px",margin:"10px 0 0 0",fontWeight:'bold',fontSize:'14px'}}><IoMdInformationCircleOutline style={{fontSize:"25px", color:"#91D5FF"}}/> Informational Note:</p>
      <p style={{lineHeight:"20px",margin:"0",fontSize:'14px'}}>Dear requester, please close all completed permits by clicking 'Pending for Closure.' It will route to OPS to close the permit completely. Take note 📝 you are not allowed to apply for more permits once the quota is up.</p>
    </div>
  );

  return (
    <div>
        {showInfo && informationalNote}
        <br/>
      <h2>Hi,{storedUser.email}</h2>
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Userashboard);
