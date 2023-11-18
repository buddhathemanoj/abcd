import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { getAllPermitsCreatedByAllUsers, getPermitsByUserId } from '../../Auth/auth';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThreeDots } from 'react-loader-spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import { IoIosSearch } from "react-icons/io";
import { AiFillFilter } from "react-icons/ai";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { BsThreeDots } from "react-icons/bs";
import { updatePermitStatus } from '../../Auth/auth';
import Popup from 'reactjs-popup';

const PermitList = ({ permits, auth }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const userId = storedUser.uid;
  console.log("userId", userId);
  const [userPermits, setUserPermits] = useState([]);
  const [showActions, setShowActions] = useState(null);
  const [isLoader, setLoader] = useState(true)
  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const permitsData = await getAllPermitsCreatedByAllUsers();

        setUserPermits(permitsData);
        setLoader(false)

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
      const permit = userPermits.find((p) => p.id === permitId);
  
      if (!permit) {
        console.error(`Permit with ID ${permitId} not found.`);
        return;
      }

      const { userId, id: permitDocumentId } = permit;

  
      const { id: permitDocumentId } = permit;

      if (action === 'approve') {
        await updatePermitStatus(permitDocumentId, 'active');
      } else if (action === 'cancel') {
        await updatePermitStatus(permitDocumentId, 'canceled');
      }
    } catch (error) {
      console.error('Error handling action:', error.message);
    }
  };
  


  return (
    <>
      {isLoader ? <div className="loader-container">
        <ThreeDots
          color="#3876E3"
          height={50}
          width={50}
        />
      </div> : <div style={{ width: "100%", overflow: "auto" }}>
        <table className="user-details-table mt-3" style={{ width: "1600px" }}>
          <thead >
            <tr>
              <th>#</th>
              <th style={{ display: "flex", alignItems: "center" }}>Permit Number <button type='button' className='permit-search-btn'><IoIosSearch /></button></th>
              <th> <div style={{ display: "flex", alignItems: "center",gap:"6px" }}> Permit Code  <button type='button' className='permit-search-btn'><IoIosSearch /></button></div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>Permit Type   <button type='button' className='permit-search-btn'><IoIosSearch /></button></div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>Discipline <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>Host/System Owner  <button type='button' className='permit-search-btn'><IoIosSearch /></button></div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>Work Description  </div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>Applier Site  <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>Date Applied  <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>Start Date  <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>End Date  <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
              <th> <div style={{ display: "flex", alignItems: "center" }}>Status  <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
              <th>Action </th>
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
                  <span style={{ padding: '8px', fontSize: '14px' }} className={`badge ${permit.status === 'active' ? 'success' : 'canceled'}`}>
                    {permit.status}
                  </span>
                </td>

                <td>
                  <div style={{ position: 'relative' }}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`ellipsis-tooltip-${index}`}>Show Actions</Tooltip>}
                    >

                      <Popup
                        trigger={<div
                          style={{ cursor: 'pointer', fontSize: '20px' }}
                          onClick={() => setShowActions(showActions === index ? null : index)}
                        >
                          <BsThreeDots />
                        </div>}
                        position={"bottom left"}
                      >
                        {close => (<div
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
                            borderRadius:"4px",
                            gap: '5px',
                            boxShadow:" 1px 2px 1px 1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
                          }}
                        >
                          <Button variant="success" onClick={() => {handleActionClick('approve', permit.id); close()}}>
                            Approve
                          </Button>
                          <Button variant="danger" onClick={() => {handleActionClick('cancel', permit.id); close() }}>
                            Cancel
                          </Button>

                        </div>)}
                        

                      </Popup>

                    </OverlayTrigger>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> </div>}

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


{/* */ }

// <div style={{ position: 'relative' }}>
// <OverlayTrigger
//   placement="top"
//   overlay={<Tooltip id={`ellipsis-tooltip-${index}`}>Show Actions</Tooltip>}
// >
//   <div
//     style={{ cursor: 'pointer', fontSize: '20px' }}
//     onClick={() => setShowActions(showActions === index ? null : index)}
//   >
//     <BsThreeDots />
//   </div>
// </OverlayTrigger>

// {showActions === index && (
//   <div
//     style={{
//       position: 'absolute',
//       top: "0%",
//       left: '10%',
//       transform: 'translateX(-110%)',
//       zIndex: 999,
//       backgroundColor: 'white',
//       boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//       padding: '10px',
//       display: 'flex',
//       flexDirection: 'row',
//       gap: '5px',
//     }}
//   >
//     <Button variant="success" onClick={() => handleActionClick('approve', permit.id)}>
//       Approve
//     </Button>
//     <Button variant="danger" onClick={() => handleActionClick('cancel', permit.id)}>
//       Cancel
//     </Button>

//   </div>
// )}
// </div>