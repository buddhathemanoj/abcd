import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { getPermitsByUserId } from '../../Auth/auth';
import Popup from 'reactjs-popup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { IoIosSearch } from "react-icons/io";
import { AiFillFilter } from "react-icons/ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
// import { Dropdown } from 'antd';
import Tooltip from 'react-bootstrap/Tooltip';
import { ThreeDots } from 'react-loader-spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { BsThreeDots } from "react-icons/bs";
import { updatePermitStatus } from '../../Auth/auth';
import { FaPlusCircle } from "react-icons/fa";
import "./userstyle.css"

const MyPermits = ({ permits, auth }) => {

    const storedUser = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate()
    const userId = storedUser.uid;
    // console.log("userId", userId);


    console.log("userId", userId);

    const [userPermits, setUserPermits] = useState([]);
    const [showActions, setShowActions] = useState(null);
    const [isLoader, setLoader] = useState(true)
    console.log(userPermits);
    useEffect(() => {
        const fetchPermits = async () => {
            try {
                const permitsData = await getPermitsByUserId(userId);
                setUserPermits(permitsData);
                setLoader(false)
                console.log("permitsData", permitsData)

            } catch (error) {
                console.error('Error fetching permits:', error.message);
            }
        };

        fetchPermits();
    }, [userId]);

    console.log(userPermits);

    const handleActionClick = async (action, permitId) => {
        try {
            const permit = userPermits.find((p) => p.id === permitId);

            if (!permit) {
                console.error(`Permit with ID ${permitId} not found.`);
                return;
            }

            const { id: permitDocumentId } = permit;
            if (action === 'resubmit') {
                await updatePermitStatus(permitDocumentId, 'pending');
            }
        } catch (error) {
            console.error('Error handling action:', error.message);
        }
    };

    const clickToCreatePermit = () => {
        navigate("/all-permits-create")
    }
    const renderPopover = (reason) => (
        <Tooltip id="popover-reason">
          <p>{reason}</p>
        </Tooltip>
      );
    const items = [
        {
            key: '1',
            label: (
                <p>{userPermits.map((eachPer) => eachPer.reason)}</p>
            ),
        },
    ];

    // let sty = ""
    //     userPermits.map(permit => {
    //         if (permit.status === "pending") {
    //              sty = "pending-style"
    //         }
    //         else if (permit.status === "canceled") {
    //             sty = "canceled-style"
    //         }
    //         else {
    //              sty =
    //         }
    //     })





    return (
        <div className="mypermits-container">
            <div className="list-permits-top-container">
                <h2>List Of Permits</h2>
                <div className="permits-btn-search-container">
                    <button type="button" className="permits-btn" onClick={clickToCreatePermit}>Create Permits <FaPlusCircle style={{ fontSize: "17px" }} /></button>
                    <input type="text" placeholder="Search" className="search-input" />
                </div>
            </div>
            {isLoader ? <div className="loader-container">
                <ThreeDots
                    color="#3876E3"
                    height={50}
                    width={50}
                />
            </div> : <div style={{ width: '100%', overflowX: 'auto' }}>
                <table className="user-details-table mt-3" style={{ width: "1600px" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}></div>Permit Number <button type='button' className='permit-search-btn'><IoIosSearch /></button></th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}></div>Permit Code <button type='button' className='permit-search-btn'><IoIosSearch /></button></th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}></div>Permit Type <button type='button' className='permit-search-btn'><IoIosSearch /></button></th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}></div>Discipline <button type='button' className='permit-search-btn'><AiFillFilter /></button></th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}></div>Host/System Owner <button type='button' className='permit-search-btn'><IoIosSearch /></button></th>
                            {/* <th> <div style={{ display: "flex", alignItems: "center" }}></div>Work Description</th> */}
                            <th> <div style={{ display: "flex", alignItems: "center" }}>Applier Site <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}>Date Applied <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}>Start Date <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}>End Date <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
                            <th> <div style={{ display: "flex", alignItems: "center" }}>Status <button type='button' className='permit-search-btn'><AiFillFilter /></button></div></th>
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
                                {/* <td>Welding</td> */}
                                <td>{permit.site}</td>
                                <td>{permit.createdAt}</td>
                                <td>{permit.startDate}</td>
                                <td>{permit.endDate}</td>
                                <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ padding: '8px', fontSize: '14px' }} className={`badge ${permit.status === 'active' ? 'success' : 'canceled'}`}>
                                        {permit.status === "canceled" ? "Rejected" : permit.status}
                                    </span><br/>
                                    <OverlayTrigger placement="top" overlay={renderPopover(permit.reason)}>
                <button  variant="info" style={{ marginLeft: '5px',border:'0px',backgroundColor:'orange',color:'red',borderRadius:'5px' }}>
                 i
                </button>
              </OverlayTrigger>
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    {permit.status === "canceled" ? <> <button className='resumit-btn' onClick={() => handleActionClick('resubmit', permit.id)} type='button' >ReSubmit</button> <br />  </> : <BsThreeDots />}
                                    {/* <div style={{ position: 'relative' }}>
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
                                      </div> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

        </div>
    )
}

const mapStateToProps = (state) => {
    console.log("state..................", state)
    return {
        auth: state.auth,
    };
};


export default connect(mapStateToProps)(MyPermits)