
import React, { useState } from 'react'
import { connect } from "react-redux";
import FileUploadComponent from '../../Components/Selectfile';
import { storePermit } from '../../Auth/auth';
import { Button, Col, FormLabel, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { format } from 'date-fns';
import { getTotalPermits } from '../../Auth/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import "./Permit.css"


const AddPermit = ({ auth }) => {
    const [permitType, setPermitType] = useState('');
    const [site, setSite] = useState('');
    const [supervisor, setSupervisor] = useState("")
    const [declarationCheck, setDeclarationCheck] = useState(false)
    const [contractCompany, setContractCompany] = useState("")
    const [site2, setSite2] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isGeneralChecked, setIsGeneralChecked] = useState(false);
    const [buildingNotes, setBuildingNotes] = useState('');
    const [levelNotes, setLevelNotes] = useState('');
    const buildingOptions = [' ADMIN', ' FAB', ' CUP', ' EXTERNAL', ' CARPARK'];
    const levelOptions = [' Basement', ' L1', ' Roof', 'East AMHS', 'West AMHS'];

    const emergencyNumber = ['F10A1: Security Control Room: 6637-0111; Facilities Control Room 69038222', 'F10A2: Security Control Room: 6637-0111; Facilities Control Room 69038222', 'F10N: Security Control Room: 6637-0111; Facilities Control Room 6637-0222', 'F10W: Security Control Room: 6360-7111; Facilities Control Room 6360-7222', 'F10X: Security Control Room: 6637-0111; Facilities Control Room 6637-0222'];

    const [selectedEmergencyNumber, setSelectedEmergencyNumber] = useState([]);
    const [finalCheck, setFinalCheck] = useState(false)
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [decDate, setDecDate] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [signFile, setSignFile] = useState(null)
    const [drawingFile, setDrawingFile] = useState(null);
    const [riskfile, setRiskFile] = useState(null);
    const [workdesc, setWorkDesc] = useState("")

    const [permitTypeError, setPermitTypeError] = useState('');
    const [siteError, setSiteError] = useState('');
    const [supervisorError, setSupervisorError] = useState('');
    const [declarationCheckError, setDeclarationCheckError] = useState('');
    const [contractCompanyError, setContractCompanyError] = useState('');
    const [site2Error, setSite2Error] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [startTimeError, setStartTimeError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [endTimeError, setEndTimeError] = useState('');
    const [selectedEmergencyNumberError, setSelectedEmergencyNumberError] = useState('');
    const [finalCheckError, setFinalCheckError] = useState('');
    const [selectedLevelsError, setSelectedLevelsError] = useState('');
    const [selectedBuildingsError, setSelectedBuildingsError] = useState('');
    const [decDateError, setDecDateError] = useState('');
    const [workdescError, setWorkDescError] = useState('');
    const [selectedFileError, setSelectedFileError] = useState('');
    const [signFileError, setSignFileError] = useState('');
    const [drawingFileError, setDrawingFileError] = useState('');
    const [riskfileError, setRiskFileError] = useState('');
    const [generalCheckError, setGeneralCheckError] = useState('');


    const handleMapFileUpload = async (file, fileType) => {
        try {
            const storageRef = ref(storage, 'path/to/upload/' + file.name);
            const metadata = { contentType: file.type };
            await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(storageRef);
            setSelectedFileError('')
            setSelectedFile(file)
            return { name: file.name, url: downloadURL, type: fileType };
        } catch (error) {
            console.error("Error uploading file:", error.message);
            throw new Error("Unable to upload file.");
        }
    };
    const handleDrawingFileUpload = async (file, fileType) => {
        try {
            const storageRef = ref(storage, 'path/to/upload/' + file.name);
            const metadata = { contentType: file.type };
            await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(storageRef);
            setDrawingFileError('')
            setDrawingFile(file)
            return { name: file.name, url: downloadURL, type: fileType };
        } catch (error) {
            console.error("Error uploading file:", error.message);
            throw new Error("Unable to upload file.");
        }
    };
    const handleRiskFileUpload = async (file, fileType) => {
        try {
            const storageRef = ref(storage, 'path/to/upload/' + file.name);
            const metadata = { contentType: file.type };
            await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(storageRef);
            setRiskFileError('')
            setRiskFile(file)
            return { name: file.name, url: downloadURL, type: fileType };
        } catch (error) {
            console.error("Error uploading file:", error.message);
            throw new Error("Unable to upload file.");
        }
    };
    const handleSignFileUpload = async (file, fileType) => {
        try {
            const storageRef = ref(storage, 'path/to/upload/' + file.name);
            const metadata = { contentType: file.type };
            await uploadBytes(storageRef, file, metadata);
            const downloadURL = await getDownloadURL(storageRef);
            setSignFileError('')
            setSignFile(file)
            return { name: file.name, url: downloadURL, type: fileType };
        } catch (error) {
            console.error("Error uploading file:", error.message);
            throw new Error("Unable to upload file.");
        }
    };
    console.log("checkx", finalCheck);

    const handleLevelCheckboxChange = (level) => {
        const updatedLevels = [...selectedLevels];

        if (updatedLevels.includes(level)) {
            updatedLevels.splice(updatedLevels.indexOf(level), 1);
        } else {
            updatedLevels.push(level);
        }
        setSelectedLevels(updatedLevels);
        setSelectedLevelsError(updatedLevels.length === 0 ? 'At least one Level must be selected' : '');
    };

    console.log("asdf", selectedEmergencyNumber);
    const handleEmergencyNumberCheckboxChange = (emergencynumber) => {
        const updatedEmergencyNumber = [...selectedEmergencyNumber];

        if (updatedEmergencyNumber.includes(emergencynumber)) {
            updatedEmergencyNumber.splice(updatedEmergencyNumber.indexOf(emergencynumber), 1);
        } else {
            updatedEmergencyNumber.push(emergencynumber);
        }

        setSelectedEmergencyNumber(updatedEmergencyNumber);
        setSelectedEmergencyNumberError(updatedEmergencyNumber.length === 0 ? 'Emergency Number is required' : '');
    };


    console.log("suuper", supervisor);


    const handleDateChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
            setStartDateError(value === '' ? 'Start Date is required' : '');
        } else if (name === 'startTime') {
            setStartTime(value);
            setStartTimeError(value === '' ? 'Start Time is required' : '');
        } else if (name === 'endDate') {
            setEndDate(value);
            setEndDateError(value === '' ? 'End Date is required' : '');
        } else if (name === 'endTime') {
            setEndTime(value);
            setEndTimeError(value === '' ? 'End Time is required' : '');
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
        setSelectedBuildingsError(updatedBuildings.length === 0 ? 'At least one building must be selected' : '');
    };

    const handleGeneralCheckboxChange = (e) => {
        setIsGeneralChecked(e.target.checked);
        setGeneralCheckError('');
    };

    const handleSubmit = async () => {
        const permitData = {
            permitType,
            decDate,
            contractCompany,
            supervisor,
            site,
            startDate,
            startTime,
            endDate,
            workdesc,
            endTime,
            isGeneralChecked,
            buildingNotes,
            levelNotes,
            selectedLevels,
            selectedBuildings,
            site2,
            selectedFile: selectedFile ? {
                name: selectedFile.name,
                type: selectedFile.type,
                url: selectedFile.url,
            } : null,
            drawingFile: drawingFile ? {
                name: drawingFile.name,
                type: drawingFile.type,
                url: drawingFile.url,
            } : null,
            signFile: signFile ? {
                name: signFile.name,
                type: signFile.type,
                url: signFile.url,
            } : null,
            riskfile: riskfile ? {
                name: riskfile.name,
                type: riskfile.type,
                url: riskfile.url,
            } : null,

        };

        if (
            permitType !== '' &&
            site !== '' &&
            supervisor !== '' &&
            isGeneralChecked &&
            declarationCheck &&
            contractCompany !== '' &&
            site2 !== '' &&
            startDate !== '' &&
            startTime !== '' &&
            endDate !== '' &&
            endTime !== '' &&
            selectedEmergencyNumber.length > 0 &&
            finalCheck &&
            selectedBuildings.length > 0 &&
            selectedLevels.length > 0 &&
            decDate !== '' &&
            workdesc !== '' &&
            selectedFile !== null &&
            signFile !== null &&
            drawingFile !== null &&
            riskfile !== null
        ) {
            setPermitTypeError('');
            setSiteError('');
            setSupervisorError('');
            setDeclarationCheckError('');
            setContractCompanyError('');
            setSite2Error('');
            setStartDateError('');
            setStartTimeError('');
            setEndDateError('');
            setEndTimeError('');
            setSelectedEmergencyNumberError('');
            setFinalCheckError('');
            setSelectedLevelsError('');
            setSelectedBuildingsError('');
            setDecDateError('');
            setWorkDescError('');
            setSelectedFileError('');
            setSignFileError('');
            setDrawingFileError('');
            setRiskFileError('');
            setGeneralCheckError('');

            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));

                const userId = storedUser.uid;

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
                const reason = ""

                const extendedPermitData = {
                    userId,
                    permitNumber,
                    status,
                    reason,
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
            setPermitTypeError(permitType === '' ? 'Permit Type is required' : '');
            setSiteError(site === '' ? 'Site is required' : '');
            setSupervisorError(supervisor === '' ? 'Supervisor is required' : '');
            setDeclarationCheckError(!declarationCheck ? 'Declaration must be checked' : '');
            setContractCompanyError(contractCompany === '' ? 'Contract Company is required' : '');
            setSite2Error(site2 === '' ? 'Required' : '');
            setStartDateError(startDate === '' ? 'Start Date is required' : '');
            setStartTimeError(startTime === '' ? 'Start Time is required' : '');
            setEndDateError(endDate === '' ? 'End Date is required' : '');
            setEndTimeError(endTime === '' ? 'End Time is required' : '');
            setSelectedEmergencyNumberError(selectedEmergencyNumber.length === 0 ? 'Emergency Number is required' : '');
            setFinalCheckError(!finalCheck ? 'Final check must be checked' : '');
            setSelectedLevelsError(selectedLevels.length === 0 ? 'At least one Level must be selected' : '');
            setSelectedBuildingsError(selectedBuildings.length === 0 ? 'At least one Building must be selected' : '');
            setDecDateError(decDate === '' ? 'Declaration Date is required' : '');
            setWorkDescError(workdesc === '' ? 'Work Description is required' : '');
            setSelectedFileError(selectedFile === null ? 'MAP file is required' : '');
            setSignFileError(signFile === null ? 'Sign file is required' : '');
            setDrawingFileError(drawingFile === null ? 'Drawing file is required' : '');
            setRiskFileError(riskfile === null ? 'Risk Assessment file is required' : '');
            setGeneralCheckError(!isGeneralChecked ? 'Required' : '');

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
                        style={{ width: "500px" }}
                        name='permitType'
                        value={permitType}
                        onChange={(e) => {
                            setPermitType(e.target.value);
                            setPermitTypeError(e.target.value === '' ? 'Permit Type is required' : '');
                        }}
                    >
                        <option value="">Select Permit Type</option>
                        <option value="_GENERAL PERMIT TO WORK">_GENERAL PERMIT TO WORK</option>
                        <option value="1">Hot Work</option>
                    </Form.Select>
                    {permitType === '' && <span style={{ color: "red", fontSize: "12px" }}>{permitTypeError}</span>}
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <p className='mb-0'>Site</p>
                    <Form.Select
                        aria-label="Default select example"
                        className='mt-0'
                        style={{ width: "500px", backgroundColor: "#FFFFFF" }}
                        value={site}
                        onChange={(e) => {
                            setSite(e.target.value);
                            setSiteError(e.target.value === '' ? 'Site is required' : '');
                        }}
                    >
                        <option value="" >Select Site</option>
                        <option value="CSE">CSE</option>
                        <option value="Tk 123">Tk 123</option>
                    </Form.Select>
                    {site === '' && <span style={{ color: "red", fontSize: "12px" }}>{siteError}</span>}
                </Col>
            </Row>
            <p className='mt-3 mb-3'><Link to="/all-permits" style={{ textDecoration: "none" }}><FaArrowLeft /> Back to view all permit</Link><span style={{ color: "blue" }}>{permitType}</span></p>

            {/* Information */}

            <div className='p-4 shadow'>
                <h6 style={{ color: "#0D3E78" }}>INFORMATION</h6><hr></hr>
                <Row>
                    <Col lg={3}>
                        <input
                            type='checkbox'
                            checked={isGeneralChecked}
                            onChange={handleGeneralCheckboxChange}
                        /> <strong>GENERAL</strong><br></br>
                        {isGeneralChecked === isGeneralChecked && <span style={{ color: "red", fontSize: "12px" }}>{generalCheckError}</span>}
                    </Col>
                    <Col lg={9} className='d-flex justify-content-between'>
                        <div>
                            <input
                                style={{ width: "160px", height: "46px" }}
                                type='date'
                                name='startDate'
                                value={startDate}
                                onChange={handleDateChange}
                                className='add-permit-input'
                                placeholder='Start Date'
                            /><br></br>
                            {startDate === '' && <span style={{ color: "red", fontSize: "12px" }}>{startDateError}</span>}
                        </div>
                        <div>
                            <input

                                style={{ width: "160px", height: "46px" }}
                                type='time'
                                name='startTime'
                                className='add-permit-input'
                                value={startTime}
                                onChange={handleDateChange}
                                placeholder='Start Time'
                            /><br></br>
                            {startTime === '' && <span style={{ color: "red", fontSize: "12px" }}>{startTimeError}</span>}
                        </div>
                        <div>
                            <input
                                style={{ width: "160px", height: "46px" }}
                                type='date'
                                name='endDate'
                                value={endDate}
                                onChange={handleDateChange}
                                className='add-permit-input'
                                placeholder='End Date'
                            /><br></br>
                            {endDate === '' && <span style={{ color: "red", fontSize: "12px" }}>{endDateError}</span>}
                        </div>
                        <div>
                            <input
                                style={{ width: "160px", height: "46px" }}
                                type='time'
                                name='endTime'
                                className='add-permit-input'
                                value={endTime}
                                onChange={handleDateChange}
                                placeholder='End Time'
                            /><br></br>
                            {endTime === '' && <span style={{ color: "red", fontSize: "12px" }}>{endTimeError}</span>}
                        </div>
                    </Col>
                </Row>

                <div className='d-flex mt-5 mb-0'>
                    <Form.Select
                        aria-label="Default select example"
                        value={site2}
                        onChange={(e) => {
                            setSite2(e.target.value);
                            setSite2Error(e.target.value === '' ? 'Required' : '');
                        }}
                        className='site'>

                        <option value="">Site</option>
                        <option value="Yard">Yard</option>
                        <option value="Fab floor 3">Fab floor 3</option>
                    </Form.Select>
                    <h6 style={{ marginLeft: "10px", fontSize: "12px" }}>Note that Start Date and End Date Max 14 Days</h6>
                </div>
                {site2 === '' && <span style={{ color: "red", fontSize: "12px" }}>{site2Error}</span>}

                <Row className='mt-4'>


                    <Col>
                        <div className='building-checkbox mr-3'>
                            <h6 style={{ fontSize: "14px", color: "#1D1A17" }}>Building<br></br>(Admin/Fab/CUP/Others)</h6>

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
                                style={{ fontSize: "14px" }}
                                type='checkbox'
                                onChange={() => handleBuildingCheckboxChange('Others')}
                            />
                            {''} Others (Pls Specify)
                        </div>
                        {selectedBuildings.length === 0 && <span style={{ color: "red", fontSize: "12px" }}>{selectedBuildingsError}</span>}
                    </Col>

                    <Col>
                        <textarea style={{ padding: "10px", minWidth: '250px' }} value={buildingNotes} onChange={(e) => setBuildingNotes(e.target.value)}></textarea>
                    </Col>

                    <Col>
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
                        {selectedLevels.length === 0 && <span style={{ color: "red", fontSize: "12px" }}>{selectedLevelsError}</span>}
                    </Col>

                    <Col>
                        <textarea
                            style={{ padding: "10px", minWidth: '250px' }}
                            placeholder='Others (Pls Specify)'
                            value={levelNotes}
                            onChange={(e) => setLevelNotes(e.target.value)} >
                        </textarea>
                    </Col>
                </Row>

                {/* <Row className='mt-4 flex-row'> 
                    <Col>
                        <div className='secTion'>
                        <input 
                        type='text'
                        placeholder='Name of contractor company'
                        />
                        </div>
                    </Col>
                    <Col>
                        <div className='secTion'>
                        <input 
                        type='text'
                        placeholder='Requester Name'
                        />
                        </div>
                    </Col>
                    <Col>
                        <div className='secTion'>
                        <input 
                        type='text'
                        placeholder='Requester Contact Number'
                        />
                        </div>
                    </Col>
                    <Col>
                        <div className='secTion'>
                        <input 
                        type='text'
                        placeholder='ABCD Department/Section'
                        />
                        </div>
                    </Col>
                    <Col>
                        <div className='secTion'>
                        <input 
                        type='text'
                        placeholder='ABCD Supervisor Name'
                        />
                        </div>
                    </Col>
                    <Col>
                        <div className='secTion'>
                        <input 
                        type='text'
                        placeholder='ABCD Supervisor Contact'
                        />
                        </div>
                    </Col>

                </Row> */}

                <Row className='mt-4'>
                    <div style={{ fontWeight: 600 }}>Note The Following Emergency Number</div>
                    <br></br><br></br>
                    <div className=''>
                        {emergencyNumber.map((emergencynumber) => (
                            <div key={emergencynumber}>
                                <input
                                    type='checkbox'
                                    checked={selectedEmergencyNumber.includes(emergencynumber)}
                                    onChange={() => handleEmergencyNumberCheckboxChange(emergencynumber)}
                                />
                                <span className='m-1'>{emergencynumber}</span>
                                <br></br><br></br>
                            </div>
                        ))}
                    </div>
                    {selectedEmergencyNumber.length === 0 && <span style={{ color: "red", fontSize: "12px" }}>{selectedEmergencyNumberError}</span>}
                </Row>
                <Row className='mt-4'>
                    <div>Revision 1.0 (Last Updated: 28 May 2021)</div>
                </Row>
                <div className='mt-5'>

                </div>
            </div>
            <div className='p-4 shadow mt-3'>
                <h6 style={{ color: "#0D3E78" }}>WORK DESCRIPTION (ATTACH DRAWING / SKETCH / DESCRIBE IN DETAILS etc...)</h6><hr></hr>
                <textarea
                    placeholder='Work Description (Attach Drawing / Sketch / Describe in Details here)'
                    className='w-100 border rounded '
                    style={{ minHeight: "5rem", textIndent: "20px" }}
                    onChange={(e) => {
                        setWorkDesc(e.target.value);
                        setWorkDescError(e.target.value === '' ? 'Work Description is required' : '');
                    }}
                ></textarea>
                {workdesc === '' && <span style={{ color: "red", fontSize: "12px" }}>{workdescError}</span>}
                <Row className='mt-5' style={{ fontSize: "small" }}>
                    <Col>
                        <FileUploadComponent
                            label="MAP"
                            onFileUpload={(file) => handleMapFileUpload(file, setSelectedFile, setSelectedFileError)}
                        />
                        {selectedFile === null && <span style={{ color: "red", fontSize: "12px" }}>{selectedFileError}</span>}
                    </Col>
                    <Col>
                        <FileUploadComponent
                            label="Drawing / Sketches"
                            onFileUpload={(file) => handleDrawingFileUpload(file, setDrawingFile, setDrawingFileError)}
                        />
                        {drawingFile === null && <span style={{ color: "red", fontSize: "12px" }}>{drawingFileError}</span>}
                    </Col>
                    <Col>
                        <FileUploadComponent
                            label="Risk Assessment"
                            onFileUpload={(file) => handleRiskFileUpload(file, setRiskFile, setRiskFileError)}
                        />
                        {riskfile === null && <span style={{ color: "red", fontSize: "12px" }}>{riskfileError}</span>}
                    </Col>
                </Row>
            </div>

            {/* Section 3 */}

            <div className='p-4 shadow mt-3'>
                <h6 style={{ color: "#0D3E78" }}>SECTION 3 : DECLARATION, CERTIFICATION & AUTHORIZATION</h6><hr></hr>

                <div style={{ fontSize: "14px", fontWeight: "600" }}>
                    <input
                        className='m-1'
                        type='checkbox'
                        onChange={(e) => {
                            setDeclarationCheck(!declarationCheck);
                            setDeclarationCheckError('');
                        }}
                    />The contractor and or its agents, sub-contractors, employee, hereby warrants the Facilities Work Permits and the accompanying Safety Risk Assessments, Safety Permits & Checklists and Procedures and EAI Assessment have been read and understood and shall take all necessary precautions before commencement of work in ABCD Fab10N and Fab10W Daily. They shall also be liable to ABCD Fab10N and Fab 10W for any damages, including direct or indirect losses incurred due to contractor and or its agent, sub-contractor, employee and servant's negligence.
                </div>
                {declarationCheck === declarationCheck && <span style={{ color: "red", fontSize: "12px" }}>{declarationCheckError}</span>}
                <div className='mt-4'>
                    <input
                        className="w-100 border"
                        style={{ height: "46px", borderRadius: "5px", borderColor: "#DADADA" }}
                        type='text'
                        placeholder='NAME OF CONTRACTOR COMPANY'
                        value={contractCompany}
                        onChange={(e) => {
                            setContractCompany(e.target.value);
                            setContractCompanyError(e.target.value === '' ? 'Contract Company is required' : '');
                        }}
                    />
                    {contractCompany === '' && <span style={{ color: "red", fontSize: "12px" }}>{contractCompanyError}</span>}
                </div>

                <Row className='mt-5 flex-row'>
                    <Col>
                        <input
                            className="border"
                            style={{ height: "46px", width: "383px", borderRadius: "5px", borderColor: "#DADADA" }}
                            type='text'
                            placeholder='CONTRACTOR SUPERVISOR (REQUESTER)'
                            value={supervisor}
                            onChange={(e) => {
                                setSupervisor(e.target.value);
                                setSupervisorError(e.target.value === '' ? 'Supervisor is required' : '');
                            }}
                        />
                        {supervisor === '' && <span style={{ color: "red", fontSize: "12px" }}>{supervisorError}</span>}
                    </Col>

                    <Col>
                        <FileUploadComponent
                            label="Sign"
                            onFileUpload={(file) => handleSignFileUpload(file, setSignFile, setSignFileError)}
                        />
                        {/* <div style={{ height: "46px", width: "383px" }} className='file-container'>
                            <button
                                className="file-btn1 border">
                                <i class="bi bi-upload m-1"></i></button>
                            <input
                                type="file"
                                className="file-input"
                                style={{ borderColor: "#DADADA" }} 
                                onFileUpload={(file) => handleFileUpload(file, )}/>
                                
                        </div> */}
                        {signFile === null && <span style={{ color: "red", fontSize: "12px" }}>{signFileError}</span>}
                    </Col>

                    <Col>
                        <input
                            style={{ height: "46px", width: "383px", borderRadius: "5px", borderColor: "#DADADA" }}
                            type='date'
                            className='add-permit-input border'
                            placeholder='Date'
                            value={decDate}
                            onChange={(e) => {
                                setDecDate(e.target.value);
                                setDecDateError(e.target.value === '' ? 'Declaration Date is required' : '');
                            }}
                        />
                        {decDate === '' && <span style={{ color: "red", fontSize: "12px" }}>{decDateError}</span>}
                    </Col>

                </Row>


                {/* <Row className='mt-5 flex-row'>
                    <Col>
                        <input className="border" style={{height:"46px",width:"383px",borderRadius:"5px", borderColor:"#DADADA"}} type='text'placeholder='CONTRACTOR PROJECT MANAGER'/>
                    </Col>

                    <Col>
                    <div style={{height:"46px",width:"383px"}} className='file-container'>
                            <button 
                            className="file-btn1 border">
                                <i class="bi bi-upload m-1"></i>Sign</button>
                            <input 
                            type="file" 
                            className="file-input"
                            style={{borderColor:"#DADADA"}} />
                        </div>   
                    </Col>

                    <Col>
                    <input
                            style={{height:"46px",width:"383px",borderRadius:"5px", borderColor:"#DADADA"}} 
                            type='date'
                            className='add-permit-input border'
                            placeholder='Date'
                        />
                    </Col>

                </Row> */}
                <div className='mt-5'>

                </div>

            </div>

            {/* Approval */}

            {/* <div className='p-4 shadow mt-3'>
                <h6 style={{ color:"#0D3E78"}}>APPROVAL</h6><hr></hr>

                <Row className='flex-row'>
                    <Col>
                    <input className='border' style={{height:"46px",width:"500px"}} type='text' placeholder='ABCD SUPERVISOR'/>
                    </Col>

                    <Col>
                    <div style={{height:"46px",width:"420px"}} className='file-container'>
                            <button 
                            className="file-btn1 border">
                                <i class="bi bi-upload m-1"></i>Sign</button>
                            <input 
                            type="file" 
                            className="file-input"
                            style={{borderColor:"#DADADA"}} />
                        </div>  
                    </Col>
                    <Col>
                    <input
                            style={{width: "230.5px",height: "46px",borderRadius:"5px", borderColor:"#DADADA"}}
                            type='date'
                            className='add-permit-input'
                            placeholder='Date'
                        />
                    </Col>
                </Row>


                <Row className='mt-5 flex-row'>
                    <Col>
                    <input className='border' style={{height:"46px",width:"500px"}} type='text' placeholder='ABCD MANAGER'/>
                    </Col>

                    <Col>
                    <div style={{height:"46px",width:"420px"}} className='file-container'>
                            <button 
                            className="file-btn1 border">
                                <i class="bi bi-upload m-1"></i>Sign</button>
                            <input 
                            type="file" 
                            className="file-input"
                            style={{borderColor:"#DADADA"}} />
                        </div>  
                    </Col>
                    <Col>
                    <input
                            style={{width: "230.5px",height: "46px",borderRadius:"5px", borderColor:"#DADADA"}}
                            type='date'
                            className='add-permit-input'
                            placeholder='Date'
                        />
                    </Col>
                </Row>
                <div className='mt-5'>

                </div>
            </div> */}

            {/* Decclaration */}

            <div className='p-4 shadow mt-3'>
                <h6 style={{ color: "#0D3E78" }}>DECLARATION</h6><hr></hr>

                <div style={{ fontSize: "14px", fontWeight: "600" }}>
                    <input
                        type='checkbox'
                        className='m-1'
                        value={finalCheck}
                        onChange={(e) => {
                            setFinalCheck(!finalCheck);
                            setFinalCheckError('');
                        }}
                    />By checking this checkbox, I solemnly declared that I have checked through the documents. All the documents that are required by the ePermit System are uploaded and correct to the best of my knowledge. I will be liable if the documents are not in order and will be subjected to legal actions by EHS if applicable.
                </div>
                {finalCheck === finalCheck && <span style={{ color: "red", fontSize: "12px" }}>{finalCheckError}</span>}
                <div className='mt-3'>
                    {/* {req && <span style={{ color: "red", fontSize: "12px", }}  >Required</span>} */}
                </div>
            </div>

            <div className='mt-4 text-end'>
                <Button variant="primary" onClick={handleSubmit} className='submit-btn'>Submit</Button>
            </div>
            <br />
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