import React, { useState } from "react";
import { connect } from "react-redux";

const Userashboard = ({ user, state }) => {
  const [showInfo, setShowInfo] = useState(true);

  // Handle the click event to hide the informational note
  const handleInfoClose = () => {
    setShowInfo(false);
  };

  // Display informational note
  const informationalNote = (
    <div style={{ background: '#f0f0f0', padding: '10px'}}>
      <span onClick={handleInfoClose} style={{ cursor: 'pointer', float: 'right', marginRight: '10px' }}>X</span>
     <p style={{lineHeight:"0px",margin:"10px 0 0 0",fontWeight:'bold',fontSize:'14px'}}> Informational Note:</p><br/>
      <p style={{lineHeight:"20px",margin:"0",fontSize:'14px'}}>Dear requester, please close all completed permits by clicking 'Pending for Closure.' It will route to OPS to close the permit completely. Take note 📝 you are not allowed to apply for more permits once the quota is up.</p>
    </div>
  );

  return (
    <div>
        {showInfo && informationalNote}
        <br/>
      <h2>Hi,{user.email}</h2>
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Userashboard);
