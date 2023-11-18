

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPermitsCreatedByAllUsers } from '../../Auth/auth';
import { AiFillFilter } from "react-icons/ai";
import { BsThreeDots } from 'react-icons/bs';
import { updatePermitStatus } from '../../Auth/auth';
import { Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';

const PermitList = ({ auth }) => {
  const CustomDropdownToggle = styled(Dropdown.Toggle)`
    &::after {
      display: none;
    }
  `;
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser.uid;

  const [userPermits, setUserPermits] = useState([]);
  const [isLoader, setLoader] = useState(true);
  const [selectedPermit, setSelectedPermit] = useState(null);
  const navigate = useNavigate();

  const handleViewNavigate = (permit) => {
    setSelectedPermit(permit);
    navigate('/view-permit', { state: { permit } });
  };

  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const permitsData = await getAllPermitsCreatedByAllUsers();
        setUserPermits(permitsData);
        setLoader(false);
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
      {isLoader ? (
        <div className="loader-container">Loading...</div>
      ) : (
        <div style={{ width: '100%', overflow: 'auto' }}>
          <table className="user-details-table mt-3" style={{ width: '1600px' }}>
           
            <thead>
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
                    <Dropdown>
                    <CustomDropdownToggle  variant="seconary" id={`dropdownActions-${index}`}><BsThreeDots /></CustomDropdownToggle>
                  
                      <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={() => handleActionClick('approve', permit.id)}>
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleActionClick('cancel', permit.id)}>
                          Cancel
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleViewNavigate(permit)}>
                          View
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


                <td style={{display:"flex",justifyContent:"center"}}>
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
  );
};

const mapStateToProps = (state) => {
  console.log('state..................', state);
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PermitList);
