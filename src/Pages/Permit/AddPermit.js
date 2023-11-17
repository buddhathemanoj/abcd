import React, { useState } from 'react'
import { connect } from "react-redux";

import { storePermit } from '../../Auth/auth';
import { Button, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { format } from 'date-fns';
import { getTotalPermits } from '../../Auth/auth';
const AddPermit = ({ auth }) => {
    const [permitType, setPermitType] = useState('');
    const [site, setSite] = useState('');
    const [site2, setSite2] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isGeneralChecked, setIsGeneralChecked] = useState(false);
    const [buildingNotes, setBuildingNotes] = useState('');
    const [levelNotes, setLevelNotes] = useState('');
    const buildingOptions = [' ADMIN', ' FAB 1A', ' FAB 2A', ' EXTERNAL', ' CARPARK'];
    const levelOptions = [' BASEMENT', ' L1', ' L2', ' L3', ' L4', ' L5', ' ROOF'];
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedBuildings, setSelectedBuildings] = useState([]);

    const handleLevelCheckboxChange = (level) => {
        const updatedLevels = [...selectedLevels];

        if (updatedLevels.includes(level)) {
            updatedLevels.splice(updatedLevels.indexOf(level), 1);
        } else {
            updatedLevels.push(level);
        }

        setSelectedLevels(updatedLevels);
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'startTime') {
            setStartTime(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        } else if (name === 'endTime') {
            setEndTime(value);
        }
    };

    const handleBuildingCheckboxChange = (building) => {
        const updatedBuildings = [...selectedBuildings];

        if (updatedBuildings.includes(building)) {
            updatedBuildings.splice(updatedBuildings.indexOf(building), 1);
        } else {
            updatedBuildings.push(building);
        }

        setSelectedBuildings(updatedBuildings);
    };

    const handleGeneralCheckboxChange = (e) => {
        setIsGeneralChecked(e.target.checked);
    };

   
    
    const handleSubmit = async () => {
        const permitData = {
          permitType,
          site,
          startDate,
          startTime,
          endDate,
          endTime,
          isGeneralChecked,
          buildingNotes,
          levelNotes,
          selectedLevels,
          selectedBuildings,
          site2,
        };
      
        if (
          permitType !== '' &&
          site !== '' &&
          startDate !== '' &&
          endDate !== '' &&
          selectedBuildings.length > 0 &&
          selectedLevels.length > 0
        ) {
          try {
            const userId = auth.user.uid;
      
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear().toString().slice(-2);
      
            const totalPermits = await getTotalPermits(userId);
      
            const counterValue = totalPermits + 1;
      
            const paddedCounter = counterValue.toString().padStart(3, '0');
            const permitNumber = `GP${day}${month}${year}${paddedCounter}`;
      
            const createdAt = format(today, 'dd-MM-yyyy');
            const status = 'pending';
      
            const extendedPermitData = {
              userId,
              permitNumber,
              status,
              createdAt,
              ...permitData,
            };
      
            console.log("Submitting permit data:", extendedPermitData);
            const permitId = await storePermit(userId, extendedPermitData);
            toast.success(`Permit data submitted successfully with ID: ${permitId}`);
          } catch (error) {
            console.error("Error submitting permit data:", error.message);
            toast.error("Error submitting permit data. Please try again.");
          }
        } else {
          toast.error('Please fill in all required fields.');
        }
      };
    
    return (
        <>
            <Row>
                <Col>
                    <p className='mb-0'>Permit Type</p>
                    <Form.Select
                        aria-label="Default select example"
                        className='mt-0'
                        name='permitType'
                        value={permitType}
                        onChange={(e) => setPermitType(e.target.value)}
                    >
                        <option value="">Select Permit Type</option>
                        <option value="_GENERAL PERMIT TO WORK">_GENERAL PERMIT TO WORK</option>
                        <option value="1">Hot Work</option>
                    </Form.Select>
                </Col>
                <Col>
                    <p className='mb-0'>Site</p>
                    <Form.Select
                        aria-label="Default select example"
                        className='mt-0'
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                    >
                        <option value="">Select Site</option>
                        <option value="CSE">CSE</option>
                        <option value="Tk 123">Tk 123</option>
                    </Form.Select>
                </Col>
            </Row>
            <p className='mt-3 mb-3'><Link to="/all-permits" style={{ textDecoration: "none" }}><FaArrowLeft /> Back to view all permit</Link></p>

            <div className='p-4 shadow'>
                <h5>INFORMATION</h5><hr></hr>
                <Row>
                    <Col lg={4}>
                        <input
                            type='checkbox'
                            checked={isGeneralChecked}
                            onChange={handleGeneralCheckboxChange}
                        /> <strong>GENERAL</strong>
                    </Col>
                    <Col lg={8} className='d-flex justify-content-between'>
                        <input
                            type='date'
                            name='startDate'
                            value={startDate}
                            onChange={handleDateChange}
                            placeholder='Start Date'
                        />
                        <input
                            type='time'
                            name='startTime'
                            value={startTime}
                            onChange={handleDateChange}
                            placeholder='Start Time'
                        />
                        <input
                            type='date'
                            name='endDate'
                            value={endDate}
                            onChange={handleDateChange}
                            placeholder='End Date'
                        />
                        <input
                            type='time'
                            name='endTime'
                            value={endTime}
                            onChange={handleDateChange}
                            placeholder='End Time'
                        />
                    </Col>
                </Row>

                <div className='d-flex mt-5 mb-0'>
                    <Form.Select aria-label="Default select example" value={site2} onChange={(e) => setSite2(e.target.value)} className='w-25'>
                        <option>Site</option>
                        <option value="Yard">Yard</option>
                        <option value="Fab floor 3">Fab floor 3</option>
                    </Form.Select>
                    <h6 style={{ marginLeft: "10px", fontSize: "12px" }}>Note that Start Date and End Date Max 5 Days</h6>
                </div>
                <span style={{ color: "red", fontSize: "12px", marginTop: "0" }}>Required</span>

                <Row className='mt-4'>
                    <Col lg={2}>
                        <h6>Building<br></br>(Admin/Fab/Cup/Others)</h6>
                        <div className='building-checkbox'>
                            {buildingOptions.map((building) => (
                                <div key={building}>
                                    <input
                                        type='checkbox'
                                        checked={selectedBuildings.includes(building)}
                                        onChange={() => handleBuildingCheckboxChange(building)}
                                    />
                                    {building} <br></br>
                                </div>
                            ))}
                            <input
                                type='checkbox'
                                onChange={() => handleBuildingCheckboxChange('Others')}
                            />
                            {' '}Others (Pls Specify)
                        </div>
                    </Col>
                    <Col lg={4}>
                        <textarea style={{ marginLeft: "1rem" }} value={buildingNotes} onChange={(e) => setBuildingNotes(e.target.value)} className='w-100 h-50 border rounded'></textarea>
                    </Col>
                    <Col lg={2}>
                        <h6>Level</h6>
                        <div className='level-checkbox'>
                            {levelOptions.map((level) => (
                                <div key={level}>
                                    <input
                                        type='checkbox'
                                        checked={selectedLevels.includes(level)}
                                        onChange={() => handleLevelCheckboxChange(level)}
                                    />
                                    {level} <br></br>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col lg={4}>
                        <textarea placeholder='Others (Pls Specify)' value={levelNotes} onChange={(e) => setLevelNotes(e.target.value)} className='w-100 h-50 border rounded' ></textarea>
                    </Col>
                </Row>
                <div className='mt-4 text-end'>
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

const mapStateToProps = (state) => {
   
    return {
      auth: state.auth,
    };
  };
  
  
export default connect(mapStateToProps)(AddPermit);
