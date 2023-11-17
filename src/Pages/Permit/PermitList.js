import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { getPermitsByUserId } from '../../Auth/auth';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';

import Tooltip from 'react-bootstrap/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { BsThreeDots } from "react-icons/bs";
import { updatePermitStatus } from '../../Auth/auth';

const PermitList = ({ permits, auth }) => {

  const userId = auth.user.uid;
  console.log("userId", userId);
  const [userPermits, setUserPermits] = useState([]);
  const [showActions, setShowActions] = useState(null);
  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const permitsData = await getPermitsByUserId(userId);
        setUserPermits(permitsData);
        console.log("permitsData", permitsData)
        
      } catch (error) {
        console.error('Error fetching permits:', error.message);
      }
    };

    fetchPermits();
  }, [userId]);

  const handleActionClick = async (action, permitId) => {
    try {
      // Find the permit with the matching ID
      const permit = userPermits.find((p) => p.id === permitId);
  
      if (!permit) {
        console.error(`Permit with ID ${permitId} not found.`);
        return;
      }
  
      // Pass userId, permitId, and new status to updatePermitStatus
      const { userId, id: permitDocumentId } = permit;
      if (action === 'approve') {
        await updatePermitStatus(userId, permitDocumentId, 'active');
      } else if (action === 'cancel') {
        await updatePermitStatus(userId, permitDocumentId, 'canceled');
      }
    } catch (error) {
      console.error('Error handling action:', error.message);
    }
  };
  
  
  return (
    <>
      <table className="user-details-table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Permit Number</th>
            <th>Permit Code</th>
            <th>Permit Type</th>
            <th>Discipline</th>
            <th>Host/System Owner</th>
            <th>Work Description</th>
            <th>Applier Site</th>
            <th>Date Applied</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {userPermits.map((permit, index) => (
            <tr key={permit.id}>
              <td>{index + 1}</td>
              <td>{permit.permitNumber}</td>
              <td>A</td>
              <td>General</td>
              <td>Welding</td>
              <td>John Doe</td>
              <td>Welding</td>
              <td>{permit.site}</td>
              <td>{permit.createdAt}</td>
              <td>{permit.startDate}</td>
              <td>{permit.endDate}</td>
              <td>
  <span style={{padding:'8px',fontSize:'14px'}} className={`badge ${permit.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
    {permit.status}
  </span>
</td>

              <td>
                <div style={{ position: 'relative' }}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`ellipsis-tooltip-${index}`}>Show Actions</Tooltip>}
                  >
                    <div
                      style={{ cursor: 'pointer', fontSize: '20px' }}
                      onClick={() => setShowActions(showActions === index ? null : index)}
                    >
                      <BsThreeDots />
                    </div>
                  </OverlayTrigger>

                  {showActions === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: "0%",
                        left: '10%',
                        transform: 'translateX(-110%)',
                        zIndex: 999,
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                      }}
                    >
                      <Button variant="success" onClick={() => handleActionClick('approve', permit.id)}>
                        Approve
                      </Button>
                      <Button variant="danger" onClick={() => handleActionClick('cancel', permit.id)}>
                        Cancel
                      </Button>

                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}


const mapStateToProps = (state) => {
  console.log("state..................", state)
  return {
    auth: state.auth,
  };
};


export default connect(mapStateToProps)(PermitList);