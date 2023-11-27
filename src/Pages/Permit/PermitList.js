import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllPermitsCreatedByAllUsers } from '../../Auth/auth';
import { AiFillFilter, AiFillSave } from "react-icons/ai";
import { BsThreeDots } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner';
import { Modal, Col, Row, In } from "react-bootstrap";
import { updatePermitStatus,updateReason } from '../../Auth/auth';
import { Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import CustomButton from '../../Components/Button';
import { IoIosSearch } from "react-icons/io";
import styled from 'styled-components';
import "../User/userstyle.css"

const PermitList = ({ auth }) => {
  const CustomDropdownToggle = styled(Dropdown.Toggle)`
    &::after {
      display: none;
    }
  `;
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser.uid;

  const [showReasonModal, setShowReasonModal] = useState(false)
  const [selectPermitId, SetselectedPermit] = useState(null)
  const [userPermits, setUserPermits] = useState([]);
  const [isLoader, setLoader] = useState(true);
  const [cancelReason, setCancelReason] = useState("")
  const [selectedPermit, setSelectedPermit] = useState(null);
  const navigate = useNavigate();
  const [canceSuc, setCancelSuc] = useState(false)
  const [err, setError] = useState(false)

  const handleViewNavigate = (permit) => {
    setSelectedPermit(permit);
    navigate('/view-permit', { state: { permit } });
  };

  const handleReasonClose = () => {
    setShowReasonModal(false)
    setCancelSuc(false)
    setError(false)
  }
  const handleShowReasonModal = (permitId) => {
    setShowReasonModal(true)
    SetselectedPermit(permitId)
  }

  const handleChangeReason = () => {

  }

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
      setError(false)
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

  const handleCancelActionClick = async (action, permitId) => {
    if (cancelReason === "") {
      setError(true)
    }
    else {
      setError(false)
      setCancelSuc(true)
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
          await updateReason(permitDocumentId,cancelReason)
          await updatePermitStatus(permitDocumentId, 'canceled');
          handleReasonClose()
        }
        // setShowReasonModal(true)
      } catch (error) {
        console.error('Error handling action:', error.message);
      }
    }

  };

  return (
    <>
      {isLoader ? (
        <div className="loader-container">
          <ThreeDots
            color="#3876E3"
            height={50}
            width={50}
          /></div>
      ) : (
        <div style={{ width: '100%', overflow: 'auto' }}>
          <table className="user-details-table mt-3" style={{ width: '1600px' }}>

            <thead>
              <tr>
                <th>#</th>
                <th> <div style={{ display: "flex", alignItems: "center" }}>Permit Number <button type='button' className='permit-search-btn'><IoIosSearch /></button></div></th>
                <th> <div style={{ display: "flex", alignItems: "center", gap: "6px" }}> Permit Code  <button type='button' className='permit-search-btn'><IoIosSearch /></button></div></th>
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
                      <CustomDropdownToggle variant="seconary" id={`dropdownActions-${index}`}><BsThreeDots /></CustomDropdownToggle>

                      <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={() => handleActionClick('approve', permit.id)}>
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleShowReasonModal(permit.id)}>
                          Cancel
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => handleViewNavigate(permit)}>
                          View
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    {/* onClick={() => handleActionClick('cancel', permit.id)} */}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <>
            <Modal
              show={showReasonModal}
              onHide={handleReasonClose}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              backdrop="static"
            >
              <Modal.Header closeButton>
                <div style={{ width: "100%" }}>
                  <h6 style={{ margin: 0, alignItems: "center" }}>Reason for cancellation</h6>
                </div>
              </Modal.Header>

              <Modal.Body>
                <Row className="mb-3">
                  <Col>
                    <input className="form-control"
                      type="text"
                      placeholder="Reason write here..."
                      required
                      value={cancelReason}
                      onChange={(event) => setCancelReason(event.target.value)}
                    />
                  
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer className="modal-footer">
              {canceSuc && <p style={{color:"green",fontWeight:"500",fontFamily:"Lucida Sans", fontSize:"12px"}}>Successfully Cancel the Permit</p>}
              {err && <p style={{color:"red",fontWeight:"500",fontFamily:"Lucida Sans", fontSize:"12px"}}>*Please give your Reason</p>}
                <CustomButton
                  disabledButton={false}
                  ClickEvent={() => handleCancelActionClick('cancel', selectPermitId)}
                  btnType="submit"
                  BtnTxt={<><AiFillSave className="save-icon" /> Submit</>}
                />
              </Modal.Footer>

            </Modal>
          </>
        </div>
      )}
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